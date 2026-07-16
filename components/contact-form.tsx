'use client';

import { useState } from 'react';
import { trackEvent } from './analytics';

type Errors = Record<string, string>;

export function ContactForm({ initialEnquiry = '', initialSubject = '' }: { initialEnquiry?: string; initialSubject?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackEvent('contact_form_start');
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const nextErrors: Errors = {};
    if (!String(data.name || '').trim()) nextErrors.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || ''))) nextErrors.email = 'Enter a valid email address.';
    if (!String(data.enquiryType || '')) nextErrors.enquiryType = 'Choose an enquiry type.';
    if (!String(data.subject || '').trim()) nextErrors.subject = 'Enter a subject.';
    if (String(data.message || '').trim().length < 20) nextErrors.message = 'Enter at least 20 characters so I can understand the enquiry.';
    if (data.consent !== 'yes') nextErrors.consent = 'Confirm that I may use these details to respond.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      requestAnimationFrame(() => document.getElementById('contact-errors')?.focus());
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json() as { ok?: boolean; errors?: Errors; message?: string };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: result.message ?? 'The message could not be sent. Please use the direct email option.' });
        setStatus('error');
        requestAnimationFrame(() => document.getElementById('contact-errors')?.focus());
        return;
      }
      form.reset();
      setErrors({});
      setStatus('sent');
      const enquiryType = String(data.enquiryType);
      trackEvent('contact_form_submit', { enquiry_type: enquiryType });
      if (enquiryType === 'Job opportunity') trackEvent('job_opportunity_enquiry');
      if (['Software development', 'IT or application support', 'Website project', 'Business software'].includes(enquiryType)) trackEvent('service_enquiry', { service_type: enquiryType });
    } catch {
      setErrors({ form: 'The message could not be sent. Please email hello@viththiyakaran.co.uk instead.' });
      setStatus('error');
    }
  }

  return <form className="contact-form" onSubmit={submit} onFocus={markStarted} noValidate>
    {status === 'error' && <div id="contact-errors" className="error-summary" role="alert" tabIndex={-1}><strong>Please check the form</strong><ul>{Object.values(errors).map((error) => <li key={error}>{error}</li>)}</ul></div>}
    {status === 'sent' && <div className="success-message" role="status"><strong>Thank you—your message was sent.</strong><p>I will respond as soon as I reasonably can, usually within two working days.</p></div>}
    <div className="form-row">
      <label>Name<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></label>
    </div>
    {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}{errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
    <label>Company or organisation <span className="optional">(optional)</span><input name="company" autoComplete="organization" /></label>
    <label>Enquiry type<select name="enquiryType" defaultValue={initialEnquiry} aria-invalid={Boolean(errors.enquiryType)}><option value="" disabled>Select an enquiry type</option><option>Job opportunity</option><option>Software development</option><option>IT or application support</option><option>Website project</option><option>Business software</option><option>Technical collaboration</option><option>General enquiry</option></select></label>
    {errors.enquiryType && <span className="field-error">{errors.enquiryType}</span>}
    <label>Subject<input name="subject" defaultValue={initialSubject} aria-invalid={Boolean(errors.subject)} /></label>{errors.subject && <span className="field-error">{errors.subject}</span>}
    <label>Message<textarea name="message" rows={7} aria-invalid={Boolean(errors.message)} /></label>{errors.message && <span className="field-error">{errors.message}</span>}
    <label className="checkbox-label"><input name="consent" type="checkbox" value="yes" /><span>I agree that my details may be used to respond to this enquiry. See the <a href="/privacy">privacy notice</a>.</span></label>
    {errors.consent && <span className="field-error">{errors.consent}</span>}
    <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry securely'}</button>
  </form>;
}
