'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

declare global { interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void } }

export function trackEvent(name: string, params: Record<string, string> = {}) { window.gtag?.('event', name, params); }

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const enabled = process.env.NODE_ENV === 'production' && Boolean(id);
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setConsent(localStorage.getItem('analytics-consent') as typeof consent);
    update();
    window.addEventListener('analytics-consent-change', update);
    return () => window.removeEventListener('analytics-consent-change', update);
  }, []);
  useEffect(() => {
    if (consent !== 'accepted' || !ready) return;
    trackEvent('page_view', { page_path: pathname });
    if (pathname.startsWith('/blog/')) trackEvent('blog_post_view', { page_path: pathname });
    if (pathname.startsWith('/projects/')) trackEvent('project_view', { page_path: pathname });
  }, [consent, pathname, ready]);
  useEffect(() => {
    if (consent !== 'accepted') return;
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest('a');
      if (!anchor?.href) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.hostname.includes('github.com')) trackEvent('github_click', { link_url: url.href });
      if (url.hostname.includes('linkedin.com')) trackEvent('linkedin_click', { link_url: url.href });
      if (url.origin !== window.location.origin) trackEvent('outbound_link_click', { link_url: url.href });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [consent]);
  return <>
    {consent === 'accepted' && enabled && id && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" /><Script id="ga4" strategy="afterInteractive" onReady={() => setReady(true)}>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true,send_page_view:false});`}</Script></>}
  </>;
}
