import type { Metadata } from 'next';
import { absoluteUrl, site } from './site';

type SeoInput = {
  title: string;
  description: string;
  path: string;
  imageTitle?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function createMetadata({ title, description, path, imageTitle, type = 'website', noIndex = false, publishedTime, modifiedTime }: SeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(`/api/og?title=${encodeURIComponent(imageTitle ?? title)}`);
  const displayTitle = path === '/' ? title : `${title} | ${site.name}`;
  return {
    title: { absolute: displayTitle },
    description,
    alternates: { canonical },
    robots: { index: !noIndex, follow: !noIndex, googleBot: { index: !noIndex, follow: !noIndex, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: { title: displayTitle, description, url: canonical, siteName: site.name, locale: site.locale, type, images: [{ url: image, width: 1200, height: 630, alt: `${imageTitle ?? title} — ${site.name}` }], ...(type === 'article' ? { publishedTime, modifiedTime } : {}) },
    twitter: { card: 'summary_large_image', title: displayTitle, description, images: [image] }
  };
}
