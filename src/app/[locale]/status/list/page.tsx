/*
 * Weibo Status List Page
 *
 * @Author: VenDream
 * @Date: 2024-07-17 15:02:23
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import type { Metadata } from 'next';
import StatusList from './status-list';

export const metadata: Metadata = {
  title: 'Status',
};

export default async function Page() {
  return <StatusList />;
}
