/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'images.unsplash.com', 'bchen-personal-website.s3.us-west-1.amazonaws.com'],
  },
  redirects: async () => {
    return [
      {
        source: '/all',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
