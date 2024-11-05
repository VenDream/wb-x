/*
 * i18n routing
 *
 * @Author: VenDream
 * @Date: 2024-10-23 17:38:22
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/contants';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LANGS),

  // Used when no locale matches
  defaultLocale: LANGS.en,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
