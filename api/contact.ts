import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const { name, email, message, lang } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({ ok: false, error: 'invalid_body' });
    }

    const trimmedName    = name.trim().slice(0, 200);
    const trimmedEmail   = email.trim().slice(0, 320);
    const trimmedMessage = message.trim().slice(0, 8000);

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !isValidEmail(trimmedEmail)) {
      return res.status(400).json({ ok: false, error: 'invalid_fields' });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to   = process.env.CONTACT_TO_EMAIL || user;

    if (!host || !user || !pass || !to) {
      console.error('contact: missing SMTP env vars');
      return res.status(503).json({ ok: false, error: 'server_misconfigured' });
    }

    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });

    const isAr = lang === 'ar';
    const subjectPrefix = isAr ? 'استفسار من موقع رودوايز' : 'Road Wise website inquiry';
    const textBody = isAr
      ? [`من: ${trimmedName}`, `البريد للرد: ${trimmedEmail}`, '', trimmedMessage].join('\n')
      : [`From: ${trimmedName}`, `Reply to: ${trimmedEmail}`, '', trimmedMessage].join('\n');

    await transporter.sendMail({
      from:    `"Road Wise" <${user}>`,
      to,
      replyTo: trimmedEmail,
      subject: `${subjectPrefix} — ${trimmedName}`,
      text:    textBody,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('contact: send failed', err);
    return res.status(500).json({ ok: false, error: 'send_failed' });
  }
}
