/*
 * App Middleware
 *
 * @Author: VenDream
 * @Date: 2023-08-29 11:23:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/contants';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';

const i18nMiddleware = createMiddleware({
  locales: Object.values(LANGS),
  defaultLocale: LANGS.en,
});

const isClerkEnabled = process.env.CLERK_ENABLED === 'true';
const isPublicRoute = createRouteMatcher([]);

export default clerkMiddleware(
  (auth, req) => {
    if (isClerkEnabled && !isPublicRoute(req)) {
      auth().protect();
    }

    return i18nMiddleware(req);
  },
  { debug: process.env.NODE_ENV === 'development' }
);

export const config = {
  matcher: ['/', '/(en-US|zh-CN)/:path*'],
};
