/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { twitter, weibo } from '@/api/server';
import type { Metadata } from 'next';
import Trackings from './trackings';

export const metadata: Metadata = {
  title: 'Trackings',
};

export default async function Page() {
  const getUsersLists = () =>
    Promise.all([weibo.getTrackingUsers(), twitter.getTrackingUsers()]);

  const [wbUsersList, twUsersList] = await getUsersLists();

  return (
    <Trackings weiboUsers={wbUsersList.list} twitterUsers={twUsersList.list} />
  );
}
