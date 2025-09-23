# Email Implementation Guide

This document explains how to implement email functionality for the contact form.

## Current Implementation

The contact form supports three methods for sending emails:

### 1. EmailJS (Recommended for client-side)
- Sign up at https://www.emailjs.com/
- Create a service and email template
- Set environment variables in `.env`:
  ```
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  VITE_EMAILJS_PUBLIC_KEY=your_public_key
  ```

### 2. Backend API (Recommended for production)
- Create a backend endpoint at `/api/send-email`
- Use services like Nodemailer, SendGrid, or AWS SES
- Example backend implementation provided below

### 3. Mailto Fallback (Always available)
- Opens user's default email client
- Pre-fills the email with form data
- Works without any configuration

## Backend Implementation Example (Node.js + Express)

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your email transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com', // or your SMTP server
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, replyTo } = req.body;
    
    await transporter.sendMail({
      from: 'noreply@yourdomain.com',
      to,
      subject,
      html,
      replyTo
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## Setup Instructions

1. **For EmailJS (Quick Setup):**
   - Visit https://www.emailjs.com/
   - Create an account and set up a service
   - Create an email template
   - Copy your credentials to `.env` file

2. **For Backend API:**
   - Implement the backend service shown above
   - Deploy to your server
   - Update `VITE_API_URL` in your environment

3. **Environment File:**
   - Copy `.env.example` to `.env`
   - Fill in your credentials

## Email Template for EmailJS

Create an email template in EmailJS with these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Phone number
- `{{company}}` - Company name
- `{{service}}` - Service interest
- `{{message}}` - Message content
- `{{to_email}}` - Recipient email (info@codensecurity.com)

The form will automatically use the mailto fallback if other methods fail.