async function handlePostRequest(request, env) {
  // Try to get the token regardless of content-type
  let token = "";
  let body;
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("form")) {
    body = await request.formData();
    token = body.get('cf-turnstile-response');
  } else {
    const json = await request.json();
    body = json;
    token = json['cf-turnstile-response'];
  }

  const ip = request.headers.get('CF-Connecting-IP');

  // Validate with Cloudflare
  const idResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${token}&remoteip=${ip}`
  });

  const outcome = await idResp.json();
  if (!outcome.success) {
     return new Response(`CAPTCHA Validation failed: ${outcome['error-codes']}`, { status: 403 });
  }

  // Extract form data
  const firstName = body.get ? body.get('firstName') : body.firstName;
  const lastName = body.get ? body.get('lastName') : body.lastName;
  const email = body.get ? body.get('email') : body.email;
  const phone = body.get ? body.get('phone') : body.phone;
  const company = body.get ? body.get('company') : body.company;
  const service = body.get ? body.get('service') : body.service;
  const message = body.get ? body.get('message') : body.message;

  // Send email using a service like SendGrid, Mailgun, or Resend
  // For this example, we'll use a simple fetch to a email service
  // Replace with your actual email sending logic

  const emailData = {
    to: 'consulting@codensecurity.com',
    subject: `Code & Security Consulting Email from ${firstName} ${lastName}`,
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

  // Example using Resend (replace with your email service)
  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`, // Use the secret from environment
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Code & Security Consulting <consulting@codensecurity.com>',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      reply_to: emailData.replyTo
    })
  });

  if (!emailResponse.ok) {
    console.error('Failed to send email:', await emailResponse.text());
    return new Response('Failed to send message. Please try again.', { status: 500 });
  }

  return new Response('Message sent successfully!', { status: 200 });
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

    return env.ASSETS.fetch(request);
  }
};