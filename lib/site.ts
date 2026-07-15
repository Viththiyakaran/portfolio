export const site = {
  name: 'Viththiyakaran Nadarajah',
  shortName: 'Viththiyakaran',
  url: 'https://viththiyakaran.co.uk',
  locale: 'en_GB',
  location: 'Newtown, Powys, Wales',
  email: 'hello@viththiyakaran.co.uk',
  description: 'Software developer and IT professional based in Newtown, Powys, Wales. Explore practical projects in .NET, React, cloud technology, technical support and business software.'
} as const;

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();
