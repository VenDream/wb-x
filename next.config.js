/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.WEIBO_API}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
