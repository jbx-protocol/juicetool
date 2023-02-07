/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  async redirects() {
    return [
      {
        source: '/nance/:slug',
        destination: 'https://www.jbdao.org/',
        permanent: true,
      },
      {
        source: '/nance/juicebox/proposal/:slug',
        destination: 'https://www.jbdao.org/proposal/:slug',
        permanent: true,
      },
      {
        source: '/juicebox',
        destination: 'https://www.jbdao.org/juicebox',
        permanent: true,
      },
    ]
  }
}

module.exports = removeImports(nextConfig)
