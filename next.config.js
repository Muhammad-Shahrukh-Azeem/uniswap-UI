/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  webpack: (config, options) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};

module.exports = nextConfig;
