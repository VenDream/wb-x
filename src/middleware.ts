/*
 * App Middleware
 *
 * @Author: VenDream
 * @Date: 2023-08-29 11:23:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { AUTH_ROUTE, LANGS, MAIN_ROUTES } from '@/contants';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const i18nMiddleware = createMiddleware({
  locales: Object.values(LANGS),
  defaultLocale: LANGS.en,
});

const isSettingsPage = (pathname: string) => {
  return Object.values(LANGS).some(
    lang => pathname === `/${lang}${MAIN_ROUTES.SETTINGS}`
  );
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isSettingsPage(pathname)) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (
        user === process.env.BASIC_AUTH_USER &&
        pwd === process.env.BASIC_AUTH_PASSWORD
      ) {
        return NextResponse.next();
      }
    }

    const url = req.nextUrl;
    url.pathname = AUTH_ROUTE;
    return NextResponse.rewrite(url);
  }

  return i18nMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en-US|zh-CN)/:path*'],
};
