'use client';

import { useEffect, useState } from 'react';

type Choice = 'accepted' | 'declined' | null;

export function CookiePreferences() {
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('analytics-consent') as Choice;
    setChoice(saved);
    if (!saved) setOpen(true);
  }, []);

  function save(value: Exclude<Choice, null>) {
    localStorage.setItem('analytics-consent', value);
    setChoice(value);
    setOpen(false);
    window.dispatchEvent(new Event('analytics-consent-change'));
  }

  return <>
    {open && <aside className="consent" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <strong id="cookie-title">Your privacy choices</strong>
      <p>Essential storage keeps your preference. Optional Google Analytics loads only if you allow it.</p>
      <div><button onClick={() => save('accepted')}>Allow analytics</button><button className="secondary" onClick={() => save('declined')}>Reject analytics</button></div>
      <a href="/cookies">Read the cookie notice</a>
    </aside>}
    {!open && choice && <button className="cookie-settings" type="button" onClick={() => setOpen(true)}>Cookie settings</button>}
  </>;
}
