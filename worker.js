async function handlePostRequest(request) {
  const body = await request.formData();

  // Turnstile post parameter name is 'cf-turnstile-response'
  const token = body.get('cf-turnstile-response');
  const ip = request.headers.get('CF-Connecting-IP');

  // Validate the token by calling the Cloudflare API
  const formData = new FormData();
  formData.append('secret', env.TURNSTILE_SECRET_KEY); // Use the secret from environment
  formData.append('response', token);
  formData.append('remoteip', ip);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  });

  const outcome = await result.json();

  if (!outcome.success) {
    return new Response('The CAPTCHA check failed. Please try again.', { status: 403 });
  }

  // Extract form data
  const firstName = body.get('firstName');
  const lastName = body.get('lastName');
  const email = body.get('email');
  const phone = body.get('phone');
  const company = body.get('company');
  const service = body.get('service');
  const message = body.get('message');

  // Send email using a service like SendGrid, Mailgun, or Resend
  // For this example, we'll use a simple fetch to a email service
  // Replace with your actual email sending logic

  const emailData = {
    to: 'consulting@codensecurity.com',
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
      <h4>Message:</h4>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This message was sent from the FortiSight contact form.</em></p>
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
      from: 'noreply@codensecurity.com',
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
    if (request.method === 'POST') {
      return handlePostRequest(request);
    }

    // Handle other requests (e.g., serve the static site)
    return new Response('Method not allowed', { status: 405 });
  }
};