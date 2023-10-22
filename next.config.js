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
        source: '/work',
        destination: '/',
        permanent: true,
      },
      // Projects
      {
        source: '/work/headspace-logo-redesign',
        destination: 'https://design.bchen.dev/work/headspace-logo-redesign',
        permanent: true,
      },
      {
        source: '/work/planner-cover',
        destination: 'https://design.bchen.dev/work/uhs-planner-cover',
        permanent: true,
      },
      {
        source: '/work/clockwise',
        destination: 'https://design.bchen.dev/work/clockwise',
        permanent: true,
      },
      {
        source: '/work/cmes',
        destination: 'https://design.bchen.dev/work/cmes-admin-panel',
        permanent: true,
      },
      {
        source: '/work/spirit-week-poster',
        destination: 'https://design.bchen.dev/work/spirit-week-poster',
        permanent: true,
      },
      {
        source: '/work/abstract-color-art',
        destination: 'https://design.bchen.dev/work/abstract-color-art',
        permanent: true,
      },
      {
        source: '/work/halloween-movie-poster',
        destination: 'https://design.bchen.dev/work/the-birds',
        permanent: true,
      },
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
        source: '/docs/:prettyLink',
        destination: '/doc/:prettyLink',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
      {
        source: '/doc/copyright',
        destination: '/doc/open-source-licenses',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
