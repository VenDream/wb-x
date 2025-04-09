/*
 * Status Detail Page
 *
 * @Author: VenDream
 * @Date: 2023-11-23 11:42:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import type { Metadata } from 'next';
import StatusDetail from './status-detail';

export const metadata: Metadata = {
  title: 'Status Detail',
};

export default async function Page({ params }: ParamsBody) {
  const { id } = await params;
  return <StatusDetail id={id} />;
}
