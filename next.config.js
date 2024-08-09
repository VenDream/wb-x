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
  reactStrictMode: true,
  transpilePackages: ['react-daisyui', 'shiki'],
  images: {
    unoptimized: true,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.WEIBO_API}/api/:path*`,
      },
    ];
  },
});

module.exports = nextConfig;
