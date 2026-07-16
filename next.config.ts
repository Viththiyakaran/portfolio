import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'www.viththiyakaran.co.uk' }], destination: 'https://viththiyakaran.co.uk/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'dazzling-khapse-99460c.netlify.app' }], destination: 'https://viththiyakaran.co.uk/:path*', permanent: true },
      { source: '/work/:slug', destination: '/projects/:slug', permanent: true },
      { source: '/articles/:slug', destination: '/blog/:slug', permanent: true }
    ];
  }
};

export default nextConfig;
