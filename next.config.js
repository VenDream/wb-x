/*
 * @Todo: 请补充模块描述
 *
 * @Author: VenDream
 * @Date: 2023-09-07 13:49:37
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  transpilePackages: ['react-daisyui'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.WEIBO_API}/:path*`,
      },
    ];
  },
});

module.exports = nextConfig;
