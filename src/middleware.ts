/*
 * App Middleware
 *
 * @Author: VenDream
 * @Date: 2023-08-29 11:23:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/contants';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: Object.values(LANGS),
  defaultLocale: LANGS.en,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
