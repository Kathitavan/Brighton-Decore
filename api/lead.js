// api/lead.js
// Brighton Decor Ltd — Unified Serverless Lead Intake Endpoint
// Runs as a Vercel Serverless Function (Node.js ESM)

const ALLOWED_TYPES = ['general', '3d_studio', 'quote', 'measurement', 'team'];

// In-memory sliding rate limiter (5 requests per 60 seconds per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, record);
    return false;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);
  return record.count > RATE_LIMIT_MAX_REQUESTS;
}

// Generate human-friendly reference ID (e.g. BD-8K3N2P)
function generateReferenceId() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let ref = 'BD-';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

// Clean and validate email format (RFC 5322 robust check)
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email.trim());
}

// Normalize WhatsApp number to Green API chatId format (e.g. 916380201679@c.us)
function normalizeWhatsAppChatId(rawNumber) {
  if (!rawNumber) return '';
  let cleaned = String(rawNumber).replace(/[^\d]/g, '');
  // If 10 digits starting with 6, 7, 8, 9 (Indian mobile), prefix 91
  if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
    cleaned = '91' + cleaned;
  }
  return cleaned.endsWith('@c.us') ? cleaned : `${cleaned}@c.us`;
}

// Isolated WhatsApp notification dispatcher via Green API
async function sendWhatsAppNotification({ refId, type, name, email, phone, message, typeDetails, screenshotBase64 }) {
  const instanceId = process.env.GREEN_API_INSTANCE_ID;
  const token = process.env.GREEN_API_TOKEN;
  const rawNotifyNumber = process.env.GREEN_API_NOTIFY_NUMBER;

  if (!instanceId || !token || !rawNotifyNumber) {
    console.warn('[WhatsApp] Skipped: GREEN_API credentials not fully configured.');
    return;
  }

  const chatId = normalizeWhatsAppChatId(rawNotifyNumber);
  const typeTitles = {
    '3d_studio': '🎨 3D Room Studio Design',
    'quote': '💼 Product Quote Request',
    'measurement': '📏 Free Site Measurement',
    'team': '🤝 Talk to Our Team Inquiry',
  };
  const typeLabel = typeTitles[type] || type.toUpperCase();

  const textMessage = [
    `🏛️ *BRIGHTON DECOR — NEW LEAD*`,
    `*Ref ID:* ${refId}`,
    `*Type:* ${typeLabel}`,
    ``,
    `*Client Contact:*`,
    `• *Name:* ${name}`,
    `• *Email:* ${email}`,
    `• *Phone:* ${phone || 'Not provided'}`,
    ``,
    typeDetails ? `${typeDetails}\n` : '',
    `*Message:*`,
    message ? message : 'No additional notes provided.',
    ``,
    `_Sent via Brighton Decor Concierge Gateway_`,
  ].filter(Boolean).join('\n');

  // 1. Send Text Notification
  try {
    const textRes = await fetch(`https://api.green-api.com/waInstance${instanceId}/sendMessage/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message: textMessage }),
    });
    const textData = await textRes.json();
    console.log(`[WhatsApp Text Sent] Ref: ${refId}, MsgId:`, textData?.idMessage || textData);
  } catch (err) {
    console.error(`[WhatsApp Text Error] Ref: ${refId}:`, err.message);
  }

  // 2. If 3d_studio has a screenshot, upload directly
  if (type === '3d_studio' && screenshotBase64) {
    try {
      const cleanBase64 = screenshotBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      const blob = new Blob([buffer], { type: 'image/png' });

      const formData = new FormData();
      formData.append('chatId', chatId);
      formData.append('fileName', `room-design-${refId}.png`);
      formData.append('caption', `📐 3D Custom Room Render — Ref ${refId} (${name})`);
      formData.append('file', blob, `room-design-${refId}.png`);

      const fileRes = await fetch(`https://api.green-api.com/waInstance${instanceId}/sendFileByUpload/${token}`, {
        method: 'POST',
        body: formData,
      });
      const fileData = await fileRes.json();
      console.log(`[WhatsApp Image Sent] Ref: ${refId}, FileMsgId:`, fileData?.idMessage || fileData);
    } catch (err) {
      console.error(`[WhatsApp Image Error] Ref: ${refId}:`, err.message);
    }
  }
}

// Format email HTML for business notification
function buildBusinessEmailHtml({ refId, type, name, email, phone, message, roomLook, productName, productId, preferredDate, preferredTime, serviceName }) {
  const typeTitles = {
    'general': 'General Customer Inquiry',
    '3d_studio': '3D Room Studio Look & Consultation',
    'quote': 'Product Price Quote Request',
    'measurement': 'Complimentary Site Measurement Booking',
    'team': 'Talk to Our Team Inquiry',
  };
  const typeTitle = typeTitles[type] || type.toUpperCase();

  let detailsRows = '';
  if (type === '3d_studio' && roomLook) {
    detailsRows = `
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Window Blinds:</td><td style="padding: 8px 12px; text-transform: uppercase;">${roomLook.blindType || 'None'} (${Math.round((roomLook.blindOpen || 0) * 100)}% Open)</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Curtains / Drapery:</td><td style="padding: 8px 12px;">${roomLook.curtainColor && roomLook.curtainColor !== 'none' ? roomLook.curtainColor : 'None'} (${Math.round((roomLook.curtainOpen || 0) * 100)}% Open)</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Flooring:</td><td style="padding: 8px 12px; text-transform: capitalize;">${roomLook.floorType || 'Standard'}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Wall Color:</td><td style="padding: 8px 12px;">${roomLook.wallColor || '#F5F0E8'}</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Sofa Style:</td><td style="padding: 8px 12px; text-transform: capitalize;">${roomLook.sofaStyle || 'Modern'} (${roomLook.sofaColor || 'Neutral'})</td></tr>
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Lighting Ambiance:</td><td style="padding: 8px 12px; text-transform: capitalize;">${roomLook.lightMode || 'Bright'}</td></tr>
    `;
  } else if (type === 'quote') {
    detailsRows = `
      <tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Product Name:</td><td style="padding: 8px 12px; font-weight: bold;">${productName || 'Unspecified'}</td></tr>
      ${productId ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Product ID:</td><td style="padding: 8px 12px; font-family: monospace;">${productId}</td></tr>` : ''}
    `;
  } else if (type === 'measurement') {
    detailsRows = `
      ${serviceName ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Service Focus:</td><td style="padding: 8px 12px; font-weight: bold;">${serviceName}</td></tr>` : ''}
      ${preferredDate ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Preferred Date:</td><td style="padding: 8px 12px;">${preferredDate}</td></tr>` : ''}
      ${preferredTime ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #C9A55A;">Preferred Time:</td><td style="padding: 8px 12px;">${preferredTime}</td></tr>` : ''}
    `;
  }

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #0E0D0B; color: #F5F2EA; border: 1px solid #C9A55A44; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
      <div style="background-color: #161412; padding: 28px 32px; border-bottom: 1px solid #C9A55A33; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.05em;">BRIGHTON DECOR LTD</h1>
          <p style="margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #C9A55A;">Concierge Lead Notification</p>
        </div>
        <div style="background: #C9A55A22; border: 1px solid #C9A55A88; padding: 6px 14px; border-radius: 9999px; font-family: monospace; font-size: 13px; font-weight: bold; color: #C9A55A;">
          ${refId}
        </div>
      </div>

      <div style="padding: 32px;">
        <div style="background: #1C1916; border-radius: 12px; padding: 18px 24px; margin-bottom: 24px; border-left: 4px solid #C9A55A;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #A8A29E; margin-bottom: 4px;">Lead Category</div>
          <div style="font-size: 18px; font-weight: 700; color: #FFFFFF;">${typeTitle}</div>
        </div>

        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #C9A55A; margin: 24px 0 12px 0;">Customer Contact Information</h3>
        <table style="width: 100%; border-collapse: collapse; background: #141311; border-radius: 8px; overflow: hidden; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #2B2620;"><td style="padding: 10px 14px; width: 140px; color: #A8A29E;">Full Name:</td><td style="padding: 10px 14px; font-weight: 600; color: #FFF;">${name}</td></tr>
          <tr style="border-bottom: 1px solid #2B2620;"><td style="padding: 10px 14px; color: #A8A29E;">Email Address:</td><td style="padding: 10px 14px;"><a href="mailto:${email}" style="color: #C9A55A; text-decoration: none;">${email}</a></td></tr>
          <tr><td style="padding: 10px 14px; color: #A8A29E;">Phone Number:</td><td style="padding: 10px 14px;"><a href="tel:${phone}" style="color: #C9A55A; text-decoration: none;">${phone || 'Not provided'}</a></td></tr>
        </table>

        ${detailsRows ? `
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #C9A55A; margin: 24px 0 12px 0;">Specification Details</h3>
          <table style="width: 100%; border-collapse: collapse; background: #141311; border-radius: 8px; overflow: hidden; margin-bottom: 24px; font-size: 13px;">
            ${detailsRows}
          </table>
        ` : ''}

        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #C9A55A; margin: 24px 0 12px 0;">Customer Project Message</h3>
        <div style="background: #141311; border: 1px solid #2B2620; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #E7E5E4; margin-bottom: 28px;">
          ${message ? message.replace(/\n/g, '<br/>') : '<em>No additional written message provided.</em>'}
        </div>

        <div style="text-align: center; padding-top: 10px;">
          <a href="mailto:${email}?subject=Regarding%20Your%20Inquiry%20${refId}%20%E2%80%94%20Brighton%20Decor" style="display: inline-block; background-color: #C9A55A; color: #0E0D0B; padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; margin-right: 12px;">Reply via Email</a>
          ${phone ? `<a href="tel:${phone}" style="display: inline-block; border: 1px solid #C9A55A88; color: #F5F2EA; padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none;">Call Customer</a>` : ''}
        </div>
      </div>

      <div style="background-color: #12100E; padding: 16px 32px; border-top: 1px solid #2B2620; font-size: 11px; color: #78716C; text-align: center;">
        Brighton Decor Ltd · 2911B Cleveland Ave, Saskatoon, SK S7K 8A9 · +1 (306) 580-6476
      </div>
    </div>
  `;
}

// Format email HTML for customer confirmation
function buildCustomerConfirmationHtml({ refId, name, type }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF8F5; color: #2B1F17; border: 1px solid #E7DFC6; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
      <div style="background-color: #2B1F17; padding: 28px 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FAF8F5; letter-spacing: 0.05em; font-family: serif;">BRIGHTON DECOR</h1>
        <p style="margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: #B89656;">Saskatoon Concierge &amp; Craftsmanship</p>
      </div>

      <div style="padding: 36px 32px;">
        <p style="font-size: 16px; margin-top: 0; color: #2B1F17;">Dear ${name},</p>
        <p style="font-size: 14px; line-height: 1.7; color: #574B40;">
          Thank you for reaching out to <strong>Brighton Decor Ltd</strong>. We have received your inquiry and our Saskatoon design specialist has been assigned to your project.
        </p>

        <div style="background-color: #F1ECE1; border: 1px dashed #B89656; border-radius: 12px; padding: 20px; text-align: center; margin: 28px 0;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #7A6958; margin-bottom: 4px;">Your Project Reference</div>
          <div style="font-size: 24px; font-weight: 700; color: #2B1F17; font-family: monospace; letter-spacing: 0.08em;">${refId}</div>
          <div style="font-size: 12px; color: #7A6958; margin-top: 6px;">Please save this reference for any direct correspondence.</div>
        </div>

        <h3 style="font-size: 14px; font-weight: 700; color: #2B1F17; margin: 24px 0 8px 0;">What happens next?</h3>
        <ul style="font-size: 13px; line-height: 1.8; color: #574B40; padding-left: 20px; margin: 0 0 24px 0;">
          <li>Our design concierge will review your selections within <strong>1 business day</strong>.</li>
          <li>For site measurements, we will contact you to coordinate a precise, zero-cost appointment.</li>
          <li>For custom quotes, we will prepare detailed material recommendations tailored to your specifications.</li>
        </ul>

        <div style="border-top: 1px solid #E7DFC6; padding-top: 20px; margin-top: 28px; font-size: 13px; color: #7A6958;">
          <p style="margin: 0 0 4px 0;">Need immediate assistance? Feel free to reach us directly:</p>
          <p style="margin: 0; font-weight: 600; color: #2B1F17;">📞 +1 (306) 580-6476 &nbsp;|&nbsp; ✉️ Shoieb@brightondecor.co</p>
          <p style="margin: 4px 0 0 0; font-size: 12px;">Flagship Office: 2911B Cleveland Ave, Saskatoon, SK S7K 8A9</p>
        </div>
      </div>

      <div style="background-color: #F1ECE1; padding: 14px 32px; font-size: 11px; color: #8F8170; text-align: center;">
        Brighten Your Home · Define Your Space · © ${new Date().getFullYear()} Brighton Decor Ltd.
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER SERVERLESS HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // 1. Cross-Origin (CORS) Configuration
  const origin = req.headers.origin || '';
  const isAllowedOrigin = 
    origin === 'https://brightondecor.co' ||
    origin === 'https://www.brightondecor.co' ||
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:') ||
    origin.endsWith('.vercel.app');

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  // 2. IP Rate Limiting Check
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many submissions from this connection. Please wait 1 minute.' });
  }

  // 3. Body Extraction & Parsing
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }
  body = body || {};

  // 4. Honeypot Abuse Filter (Silent rejection)
  if (body.website || body.hp || body.honeypot) {
    console.warn(`[Honeypot Triggered] Silent drop from IP: ${clientIp}`);
    const fakeRef = generateReferenceId();
    return res.status(200).json({ success: true, referenceId: fakeRef });
  }

  // 5. Payload Validation
  const {
    name,
    email,
    phone = '',
    type,
    message = '',
    roomLook,
    screenshotBase64,
    productName,
    productId,
    preferredDate,
    preferredTime,
    serviceName,
  } = body;

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({ error: 'Please provide a valid full name (2–100 characters).' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!type || !ALLOWED_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid lead type. Allowed: ${ALLOWED_TYPES.join(', ')}` });
  }

  // Reject type-specific fields present on wrong types
  if (type !== '3d_studio' && (roomLook || screenshotBase64)) {
    return res.status(400).json({ error: 'roomLook and screenshotBase64 are only permitted for type "3d_studio".' });
  }
  if (type !== 'quote' && (productName || productId)) {
    return res.status(400).json({ error: 'productName and productId are only permitted for type "quote".' });
  }

  // Size cap on screenshot (max ~7MB base64)
  if (screenshotBase64 && typeof screenshotBase64 === 'string' && screenshotBase64.length > 7 * 1024 * 1024) {
    return res.status(400).json({ error: 'Screenshot payload exceeds maximum size limit (5MB).' });
  }

  // 6. Generate Reference ID
  const refId = generateReferenceId();
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone ? String(phone).trim() : '';
  const trimmedMessage = message ? String(message).trim() : '';

  // 7. Prepare Type-Specific Summaries
  let typeDetailsForWhatsApp = '';
  if (type === '3d_studio' && roomLook) {
    typeDetailsForWhatsApp = [
      `*3D Specifications:*`,
      `• Blinds: ${roomLook.blindType || 'None'}`,
      `• Drapery: ${roomLook.curtainColor !== 'none' ? roomLook.curtainColor : 'None'}`,
      `• Flooring: ${roomLook.floorType || 'Standard'}`,
      `• Wall: ${roomLook.wallColor || 'Neutral'}`,
      `• Sofa: ${roomLook.sofaStyle || 'Modern'}`,
      `• Ambiance: ${roomLook.lightMode || 'Bright'}`,
    ].join('\n');
  } else if (type === 'quote') {
    typeDetailsForWhatsApp = [
      `*Product Focus:*`,
      `• Name: ${productName || 'Custom'}`,
      productId ? `• ID: ${productId}` : '',
    ].filter(Boolean).join('\n');
  } else if (type === 'measurement') {
    typeDetailsForWhatsApp = [
      `*Measurement Request:*`,
      serviceName ? `• Service: ${serviceName}` : '',
      preferredDate ? `• Date: ${preferredDate}` : '',
      preferredTime ? `• Time: ${preferredTime}` : '',
    ].filter(Boolean).join('\n');
  }

  // 8. Dispatch Email via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  const leadNotifyEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'sachinkathiravan455@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Brighton Decor <onboarding@resend.dev>';

  if (resendApiKey) {
    const emailSubjects = {
      'general': `[${refId}] New Website Inquiry — ${trimmedName}`,
      '3d_studio': `[${refId}] 3D Room Studio Design Lead — ${trimmedName}`,
      'quote': `[${refId}] Quote Request — ${productName || 'Window Decor'} — ${trimmedName}`,
      'measurement': `[${refId}] Free Site Measurement Booking — ${trimmedName}`,
      'team': `[${refId}] Talk to Our Team Inquiry — ${trimmedName}`,
    };
    const businessSubject = emailSubjects[type] || `[${refId}] New Lead — ${trimmedName}`;

    // Prepare attachment for 3d_studio if screenshot exists
    const attachments = [];
    if (type === '3d_studio' && screenshotBase64) {
      try {
        const cleanBase64 = screenshotBase64.replace(/^data:image\/\w+;base64,/, '');
        attachments.push({
          filename: `room-design-${refId}.png`,
          content: cleanBase64,
        });
      } catch (attErr) {
        console.warn(`[Resend Attachment Warning] Ref: ${refId}:`, attErr.message);
      }
    }

    // Business Notification Email
    try {
      const emailPayload = {
        from: fromEmail,
        to: [leadNotifyEmail],
        reply_to: trimmedEmail,
        subject: businessSubject,
        html: buildBusinessEmailHtml({
          refId,
          type,
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          message: trimmedMessage,
          roomLook,
          productName,
          productId,
          preferredDate,
          preferredTime,
          serviceName,
        }),
      };
      if (attachments.length > 0) {
        emailPayload.attachments = attachments;
      }

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      const resendData = await resendRes.json();
      if (!resendRes.ok) {
        console.error(`[Resend Business Email Failed] Ref: ${refId}:`, resendData);
      } else {
        console.log(`[Resend Business Email Sent] Ref: ${refId}, Id:`, resendData?.id);
      }
    } catch (emailErr) {
      console.error(`[Resend Business Email Exception] Ref: ${refId}:`, emailErr.message);
    }

    // Customer Confirmation Email (Always clean, no screenshot or internal notes)
    try {
      const customerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [trimmedEmail],
          subject: `Brighton Decor — Confirmation (${refId})`,
          html: buildCustomerConfirmationHtml({
            refId,
            name: trimmedName,
            type,
          }),
        }),
      });
      const custData = await customerRes.json();
      if (!customerRes.ok) {
        console.warn(`[Resend Customer Email Failed] Ref: ${refId}:`, custData);
      } else {
        console.log(`[Resend Customer Email Sent] Ref: ${refId}, Id:`, custData?.id);
      }
    } catch (custErr) {
      console.warn(`[Resend Customer Email Exception] Ref: ${refId}:`, custErr.message);
    }
  } else {
    console.warn('[Resend] Skipped: RESEND_API_KEY environment variable is not defined.');
  }

  // 9. Dispatch WhatsApp for High-Intent Types (Independent try/catch)
  if (type !== 'general') {
    try {
      await sendWhatsAppNotification({
        refId,
        type,
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        message: trimmedMessage,
        typeDetails: typeDetailsForWhatsApp,
        screenshotBase64,
      });
    } catch (waErr) {
      console.error(`[WhatsApp Notification Exception] Ref: ${refId}:`, waErr.message);
    }
  }

  // 10. Successful Return Response
  return res.status(200).json({
    success: true,
    referenceId: refId,
    message: 'Lead received and processed successfully',
  });
}
