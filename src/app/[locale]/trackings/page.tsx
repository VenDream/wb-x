/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Metadata } from 'next';
import Trackings from './trackings';

export const metadata: Metadata = {
  title: 'Trackings',
};

export default async function Page() {
  return <Trackings />;
}
