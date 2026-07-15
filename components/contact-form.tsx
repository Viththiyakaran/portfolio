'use client';
import { useState } from 'react';
import { trackEvent } from './analytics';
export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const data = new FormData(e.currentTarget); const subjectValue=String(data.get('subject')); const subject = encodeURIComponent(subjectValue); const body = encodeURIComponent(`Name: ${data.get('name')}\n\n${data.get('message')}`); trackEvent('contact_submission'); if(subjectValue.toLowerCase().includes('enquiry')) trackEvent('service_enquiry',{service_type:subjectValue}); window.location.href = `mailto:hello@viththiyakaran.co.uk?subject=${subject}&body=${body}`; setSent(true); }
  return <form className="contact-form" onSubmit={submit}><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>What can I help with?<select name="subject" defaultValue=""><option value="" disabled>Select an enquiry type</option><option>Software development enquiry</option><option>Website development enquiry</option><option>Technical support enquiry</option><option>Career opportunity</option></select></label><label>Message<textarea name="message" rows={6} required /></label><button type="submit">Prepare email enquiry</button>{sent && <p role="status">Your email application should now be open. No form data was sent through this website.</p>}</form>;
}
