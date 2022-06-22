/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'images.unsplash.com', 'bchen-personal-website.s3.us-west-1.amazonaws.com'],
  }
}

module.exports = nextConfig
