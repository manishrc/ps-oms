/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products/starline/207BLX",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
