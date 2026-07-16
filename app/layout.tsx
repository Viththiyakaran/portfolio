import type { Metadata } from 'next';
import { Analytics } from '@/components/analytics';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { CookiePreferences } from '@/components/cookie-preferences';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Viththiyakaran Nadarajah | Software Developer in Wales', template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  manifest: '/site.webmanifest',
  alternates: { types: { 'application/rss+xml': `${site.url}/rss.xml` } },
  formatDetection: { email: false, address: false, telephone: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-GB"><body><a className="skip-link" href="#main">Skip to main content</a><Header /><main id="main">{children}</main><Footer /><CookiePreferences /><Analytics /></body></html>; }
