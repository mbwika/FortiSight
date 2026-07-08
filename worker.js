const TEXT_RESPONSE_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
};

function getField(body, field) {
  if (body && typeof body.get === "function") {
    const value = body.get(field);
    return typeof value === "string" ? value.trim() : "";
  }

  if (body && typeof body === "object") {
    const value = body[field];
    return typeof value === "string" ? value.trim() : "";
  }

  return "";
}

async function handlePostRequest(request, env) {
  let token = "";
  let body;
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("form")) {
      body = await request.formData();
      token = getField(body, "cf-turnstile-response");
    } else {
      const json = await request.json();
      body = json;
      token = getField(json, "cf-turnstile-response");
    }
  } catch (error) {
    console.error("Failed to parse contact request", error);
    return new Response("We couldn't read your message. Please try again.", {
      status: 400,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return new Response("Form protection is not configured yet. Please email consulting@codensecurity.com directly.", {
      status: 503,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  if (!token) {
    return new Response("Please complete the CAPTCHA verification.", {
      status: 400,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  const ip = request.headers.get('CF-Connecting-IP');

  let outcome;
  try {
    const idResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip || "")}`
    });
    outcome = await idResp.json();
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return new Response("We couldn't verify the CAPTCHA. Please try again.", {
      status: 502,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  if (!outcome.success) {
     return new Response(`CAPTCHA validation failed: ${(outcome['error-codes'] || []).join(", ")}`, {
      status: 403,
      headers: TEXT_RESPONSE_HEADERS,
     });
  }

  const firstName = getField(body, 'firstName');
  const lastName = getField(body, 'lastName');
  const email = getField(body, 'email');
  const phone = getField(body, 'phone');
  const company = getField(body, 'company');
  const service = getField(body, 'service');
  const message = getField(body, 'message');

  if (!firstName || !email || !message) {
    return new Response("Please fill in the required fields before submitting.", {
      status: 400,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response("Email delivery is not configured yet. Please email consulting@codensecurity.com directly.", {
      status: 503,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  const emailData = {
    to: 'consulting@codensecurity.com',
    subject: service
      ? `Code & Security Consulting enquiry: ${service}`
      : `Code & Security Consulting Email from ${firstName} ${lastName}`.trim(),
    html: `
      <h3>Message</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
      <h4>Message:</h4>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This message was sent from the Code & Security Consulting contact form.</em></p>
    `,
    replyTo: email
  };

  let emailResponse;
  try {
    emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Code & Security Consulting <consulting@codensecurity.com>',
        to: ["consulting@codensecurity.com"],
        subject: emailData.subject,
        html: emailData.html,
        reply_to: emailData.replyTo
      })
    });
  } catch (error) {
    console.error('Email delivery request failed:', error);
    return new Response('Failed to send message right now. Please email consulting@codensecurity.com directly.', {
      status: 502,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  if (!emailResponse.ok) {
    console.error('Failed to send email:', await emailResponse.text());
    return new Response('Failed to send message right now. Please email consulting@codensecurity.com directly.', {
      status: 500,
      headers: TEXT_RESPONSE_HEADERS,
    });
  }

  return new Response('Message sent successfully!', {
    status: 200,
    headers: TEXT_RESPONSE_HEADERS,
  });
}

function isStaticAssetPath(pathname) {
  return /\.[a-z0-9]+$/i.test(pathname);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/contact') {
        if (request.method === 'POST') {
          return handlePostRequest(request, env);
        }
        if (request.method === 'OPTIONS') {
          return new Response(null, {
            status: 204,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          });
        }
        return new Response('Method not allowed', { status: 405 });
      }
      return new Response('Not found', { status: 404 });
    }

    const isAiafSubdomain = url.hostname.startsWith('aiaf.');
    const isAiafPath = url.pathname === '/aiaf' || url.pathname === '/aiaf/';
    const shouldServeAiafShell =
      request.method === 'GET' &&
      !isStaticAssetPath(url.pathname) &&
      (isAiafSubdomain || isAiafPath);

    if (shouldServeAiafShell) {
      const aiafUrl = new URL(request.url);
      aiafUrl.pathname = '/aiaf.html';
      aiafUrl.search = '';
      return env.ASSETS.fetch(new Request(aiafUrl, request));
    }

    return env.ASSETS.fetch(request);
  }
};
