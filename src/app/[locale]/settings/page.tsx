/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2024-04-07 15:16:26
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import type { Metadata } from 'next';
import Settings from './settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Page() {
  return <Settings />;
}
