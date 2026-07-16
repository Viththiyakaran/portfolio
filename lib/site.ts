const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const productionUrl = 'https://viththiyakaran.co.uk';

export const site = {
  name: 'Viththiyakaran Nadarajah',
  shortName: 'Viththiyakaran',
  url: configuredUrl || productionUrl,
  locale: 'en_GB',
  location: 'Newtown, Powys, Wales',
  email: 'hello@viththiyakaran.co.uk',
  github: 'https://github.com/Viththiyakaran',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || '',
  description: 'Software developer and IT support professional based in Newtown, Powys. Explore practical .NET, React, cloud and business software projects.'
} as const;

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();
