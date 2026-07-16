import { NextResponse } from 'next/server';

const attempts = new Map<string, { count: number; expires: number }>();
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

type ContactBody = {
  name?: unknown; email?: unknown; company?: unknown; enquiryType?: unknown; subject?: unknown; message?: unknown; consent?: unknown; website?: unknown;
};

const text = (value: unknown, max = 4000) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) return NextResponse.json({ message: 'Request is too large.' }, { status: 413 });
  const ip = request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.expires > now && current.count >= LIMIT) return NextResponse.json({ message: 'Too many attempts. Please wait before trying again.' }, { status: 429 });
  attempts.set(ip, current && current.expires > now ? { ...current, count: current.count + 1 } : { count: 1, expires: now + WINDOW_MS });

  let body: ContactBody;
  try { body = await request.json() as ContactBody; } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  if (text(body.website)) return NextResponse.json({ ok: true });

  const fields = {
    name: text(body.name, 120),
    email: text(body.email, 180),
    company: text(body.company, 180),
    enquiryType: text(body.enquiryType, 80),
    subject: text(body.subject, 180),
    message: text(body.message),
    consent: text(body.consent, 10)
  };
  const errors: Record<string, string> = {};
  if (!fields.name) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email address.';
  if (!fields.enquiryType) errors.enquiryType = 'Choose an enquiry type.';
  if (!fields.subject) errors.subject = 'Enter a subject.';
  if (fields.message.length < 20) errors.message = 'Enter at least 20 characters.';
  if (fields.consent !== 'yes') errors.consent = 'Consent is required.';
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

  const netlifyOrigin = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!netlifyOrigin) return NextResponse.json({ message: 'Form delivery is available on the deployed Netlify site.' }, { status: 503 });
  const form = new URLSearchParams({ 'form-name': 'contact', ...fields });
  const response = await fetch(`${netlifyOrigin}/netlify-contact.html`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString() });
  if (!response.ok) return NextResponse.json({ message: 'The form service could not accept this message.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
