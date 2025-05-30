/*
 * Tweet Detail Page
 *
 * @Author: VenDream
 * @Date: 2025-05-28 17:21:13
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import type { Metadata } from 'next';
import TweetDetail from './tweet-detail';

export const metadata: Metadata = {
  title: 'Tweet Detail',
};

export default async function Page({ params }: ParamsBody) {
  const { id } = await params;
  return <TweetDetail id={id} />;
}
