/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.akamai.steamstatic.com",
      },
    ],
  },
};

module.exports = nextConfig;
