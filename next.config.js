/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'images.unsplash.com', 'bchen-personal-website.s3.us-west-1.amazonaws.com'],
  },
  outputFileTracing: false,
  redirects: async () => {
    return [
      {
        source: '/all',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/project/:prettyLink',
        destination: '/work/:prettyLink',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
