/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACK_URL: process.env.BACK_URL,
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngkey.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
