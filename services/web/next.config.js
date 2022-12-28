/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  env: {
    APP_NAME: "Manap",
  },
};

module.exports = nextConfig;
