/*
 * App Middleware
 *
 * @Author: VenDream
 * @Date: 2023-08-29 11:23:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/contants';
import { authMiddleware } from '@clerk/nextjs';
import createMiddleware from 'next-intl/middleware';

const i18nMiddleware = createMiddleware({
  locales: Object.values(LANGS),
  defaultLocale: LANGS.en,
});

export default authMiddleware({
  beforeAuth(req) {
    return i18nMiddleware(req);
  },
  publicRoutes: ['/', '/(en-US|zh-CN)'],
});

export const config = {
  matcher: ['/', '/(en-US|zh-CN)/:path*'],
};
