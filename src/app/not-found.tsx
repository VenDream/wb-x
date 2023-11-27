/*
 * Non-localized 404
 *
 * @Author: VenDream
 * @Date: 2023-11-27 13:52:24
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

'use client';

import { LANGS } from '@/contants';
import { redirect, usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  redirect(`/${LANGS.en}${pathname}`);
}
