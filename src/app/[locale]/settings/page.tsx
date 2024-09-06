/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2024-04-07 15:16:26
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import Settings from './settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Page({ params }: ParamsBody) {
  unstable_setRequestLocale(params.locale);

  return <Settings />;
}
