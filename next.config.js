/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      }
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/',
        permanent: true,
      },
      // Docs
      {
        source: '/doc/clockwise-privacy',
        destination: 'https://gist.github.com/brendan-ch/74f7fd1b93a5c093d6fa9b714706d5f6',
        permanent: true,
      },
      {
        source: '/doc/clockwise-licenses',
        destination: 'https://gist.github.com/brendan-ch/033a37ad207e1d10dc2dc1dc9f0b75f6',
        permanent: true,
      },
      {
        source: '/doc/clockwise-migrate',
        destination: 'https://gist.github.com/brendan-ch/1c1084b817ad589c9936c3d37752a84f',
        permanent: true,
      },
      {
        source: '/doc/clockwise-whats-new',
        destination: 'https://gist.github.com/brendan-ch/90da41b690d3579dd5e755aa7d1ac552',
        permanent: true,
      },
      {
        source: '/doc/clockwise-app',
        destination: 'https://gist.github.com/brendan-ch/3bad40f7c4dcbd7be990411ec7f9ec50',
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
