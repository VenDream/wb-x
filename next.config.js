/*
 * Next Config
 *
 * @Author: VenDream
 * @Date: 2023-11-17 16:58:00
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_HOST}/api/:path*`,
      },
    ];
  },
});

module.exports = nextConfig;
