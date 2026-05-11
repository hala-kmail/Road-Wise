import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json({ limit: '48kb' }));

const PORT = Number(process.env.CONTACT_API_PORT) || 3001;

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, lang } = req.body ?? {};
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      res.status(400).json({ ok: false, error: 'invalid_body' });
      return;
    }
    const trimmedName = name.trim().slice(0, 200);
    const trimmedEmail = email.trim().slice(0, 320);
    const trimmedMessage = message.trim().slice(0, 8000);
    if (!trimmedName || !trimmedEmail || !trimmedMessage || !isValidEmail(trimmedEmail)) {
      res.status(400).json({ ok: false, error: 'invalid_fields' });
      return;
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO_EMAIL || user;
    if (!host || !user || !pass || !to) {
      console.error('contact-smtp: missing SMTP_HOST, SMTP_USER, SMTP_PASS, or recipient');
      res.status(503).json({ ok: false, error: 'server_misconfigured' });
      return;
    }

    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const isAr = lang === 'ar';
    const subjectPrefix = isAr ? 'استفسار من موقع رودوايز' : 'Road Wise website inquiry';
    const textBody = isAr
      ? [`من: ${trimmedName}`, `البريد للرد: ${trimmedEmail}`, '', trimmedMessage].join('\n')
      : [`From: ${trimmedName}`, `Reply to: ${trimmedEmail}`, '', trimmedMessage].join('\n');

    await transporter.sendMail({
      from: `"Road Wise" <${user}>`,
      to,
      replyTo: trimmedEmail,
      subject: `${subjectPrefix} — ${trimmedName}`,
      text: textBody,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('contact-smtp: send failed', err);
    res.status(500).json({ ok: false, error: 'send_failed' });
  }
});

app.listen(PORT, () => {
  console.log(`contact-smtp listening on http://127.0.0.1:${PORT}`);
});
