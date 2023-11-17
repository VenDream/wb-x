/*
 * next-intl navigation
 *
 * @Author: VenDream
 * @Date: 2023-11-17 11:24:37
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/contants';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const locales = Object.values(LANGS);

export const { Link, useRouter, usePathname, redirect } =
  createSharedPathnamesNavigation({ locales });
