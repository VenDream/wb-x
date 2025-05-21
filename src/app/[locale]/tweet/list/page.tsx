/*
 * Twitter Tweet List Page
 *
 * @Author: VenDream
 * @Date: 2025-05-15 10:18:30
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import type { Metadata } from 'next';
import TweetList from './tweet-list';

export const metadata: Metadata = {
  title: 'Tweet',
};

export default async function Page() {
  return <TweetList />;
}
