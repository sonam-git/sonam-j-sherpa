import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot fields (should be empty)
  website?: string;
  phone?: string;
  // Timestamp for timing check
  timestamp?: number;
}

// ============ RATE LIMITING ============
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    const cutoff = now - RATE_LIMIT_WINDOW * 5;
    for (const [key, value] of rateLimitMap) {
      if (value.timestamp < cutoff) rateLimitMap.delete(key);
    }
  }

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// ============ EMAIL VALIDATION ============
function isValidEmail(email: string): boolean {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  
  // Check for valid TLD (at least 2 characters)
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const domain = parts[1];
  const domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  
  // Check TLD is valid (not just numbers)
  const tld = domainParts[domainParts.length - 1];
  if (/^\d+$/.test(tld)) return false;
  
  return true;
}

// ============ DISPOSABLE EMAIL DETECTION ============
const disposableDomains = new Set([
  'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
  'mailinator.com', 'maildrop.cc', 'temp-mail.org', 'fakeinbox.com',
  'trashmail.com', 'discard.email', 'getnada.com', 'tempail.com',
  'mohmal.com', 'emailondeck.com', 'tempmailo.com', 'tempr.email',
  'dispostable.com', 'mailnesia.com', 'spamgourmet.com', 'mytemp.email',
  'sharklasers.com', 'guerrillamailblock.com', 'pokemail.net', 'spam4.me',
  'grr.la', 'yopmail.com', 'mailcatch.com', 'mintemail.com', 'tempinbox.com',
  'burnermail.io', '33mail.com', 'anonaddy.com',
]);

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.has(domain);
}

// ============ SPAM CONTENT DETECTION ============
const spamPatterns = [
  // Links and URLs (excessive)
  /https?:\/\/[^\s]+/gi,
  // Common spam keywords
  /\b(viagra|cialis|casino|lottery|winner|congratulations|click here|act now|limited time|free money|make money fast|earn \$|buy now|order now|special offer)\b/gi,
  // Crypto scams
  /\b(bitcoin|crypto|btc|eth|wallet address|send coins|investment opportunity|guaranteed return)\b/gi,
  // HTML tags (shouldn't be in plain text)
  /<[^>]+>/g,
  // Excessive caps
  /[A-Z]{10,}/g,
  // Repeated characters
  /(.)\1{5,}/g,
];

function detectSpamContent(text: string): { isSpam: boolean; reason?: string } {
  // Check for empty or very short content
  if (text.length < 10) {
    return { isSpam: false };
  }

  // Count URL occurrences
  const urlMatches = text.match(/https?:\/\/[^\s]+/gi) || [];
  if (urlMatches.length > 3) {
    return { isSpam: true, reason: 'Too many URLs detected' };
  }

  // Check spam patterns
  for (const pattern of spamPatterns.slice(1)) { // Skip URL pattern already checked
    const matches = text.match(pattern) || [];
    if (matches.length > 2) {
      return { isSpam: true, reason: 'Spam content detected' };
    }
  }

  // Check for excessive special characters
  const specialCharCount = (text.match(/[!@#$%^&*()_+=\[\]{}|\\:";'<>?,./~`]/g) || []).length;
  if (specialCharCount > text.length * 0.3) {
    return { isSpam: true, reason: 'Excessive special characters' };
  }

  return { isSpam: false };
}

// ============ INPUT SANITIZATION ============
function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, maxLength);
}

// ============ BOT DETECTION ============
function detectBot(request: NextRequest, data: ContactFormData): { isBot: boolean; reason?: string } {
  // Check honeypot fields (should be empty)
  if (data.website && data.website.trim() !== '') {
    return { isBot: true, reason: 'Honeypot triggered (website)' };
  }
  if (data.phone && data.phone.trim() !== '') {
    return { isBot: true, reason: 'Honeypot triggered (phone)' };
  }

  // Check timing (form filled too fast - less than 3 seconds)
  if (data.timestamp) {
    const timeTaken = Date.now() - data.timestamp;
    if (timeTaken < 3000) { // Less than 3 seconds
      return { isBot: true, reason: 'Form submitted too quickly' };
    }
  }

  // Check user agent
  const userAgent = request.headers.get('user-agent') || '';
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /curl/i, /wget/i, /python/i,
    /scrapy/i, /headless/i, /phantom/i, /selenium/i,
  ];
  
  for (const pattern of botPatterns) {
    if (pattern.test(userAgent)) {
      return { isBot: true, reason: 'Bot user agent detected' };
    }
  }

  // Check for missing or suspicious headers
  if (!userAgent || userAgent.length < 10) {
    return { isBot: true, reason: 'Invalid user agent' };
  }

  return { isBot: false };
}

// ============ MAIN HANDLER ============
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body: ContactFormData;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Bot detection
    const botCheck = detectBot(request, body);
    if (botCheck.isBot) {
      console.log(`Bot detected: ${botCheck.reason}, IP: ${ip}`);
      // Return success to not alert the bot
      return NextResponse.json(
        { message: 'Message received' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name, 100);
    const sanitizedEmail = sanitizeInput(email, 254);
    const sanitizedSubject = sanitizeInput(subject, 200);
    const sanitizedMessage = sanitizeInput(message, 5000);

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check for disposable email
    if (isDisposableEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Please use a permanent email address (disposable emails are not accepted)' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (sanitizedSubject.length < 3) {
      return NextResponse.json(
        { error: 'Subject must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Spam content detection
    const spamCheck = detectSpamContent(sanitizedMessage);
    if (spamCheck.isSpam) {
      console.log(`Spam detected: ${spamCheck.reason}, IP: ${ip}`);
      return NextResponse.json(
        { error: 'Your message was flagged as potential spam. Please revise and try again.' },
        { status: 400 }
      );
    }

    const subjectSpamCheck = detectSpamContent(sanitizedSubject);
    if (subjectSpamCheck.isSpam) {
      return NextResponse.json(
        { error: 'Your subject was flagged as potential spam. Please revise and try again.' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
      console.error('Missing SMTP configuration environment variables');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 503 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: sanitizedEmail,
      subject: `[Website Contact] ${sanitizedSubject}`,
      text: `
New Contact Form Submission
============================

From: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
Metadata:
- IP: ${ip}
- User Agent: ${request.headers.get('user-agent')?.slice(0, 100) || 'Unknown'}
- Timestamp: ${new Date().toISOString()}

This message was sent from your portfolio website contact form.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 24px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
    .content { background: #ffffff; padding: 24px; }
    .field { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb; }
    .field:last-of-type { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .value { color: #111827; font-size: 16px; }
    .message-box { background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 8px; }
    .footer { background: #f3f4f6; padding: 16px 24px; text-align: center; color: #6b7280; font-size: 12px; }
    .metadata { color: #9ca3af; font-size: 11px; margin-top: 4px; }
    a { color: #f59e0b; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Message</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${sanitizedName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${sanitizedSubject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>Sent from your portfolio website contact form</p>
      <p class="metadata">IP: ${ip} | ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully from ${sanitizedEmail}, IP: ${ip}`);

    return NextResponse.json(
      { message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
