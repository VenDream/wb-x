/*
 * Scanning Page
 *
 * @Author: VenDream
 * @Date: 2024-11-06 14:54:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Metadata } from 'next';
import Scanning from './scanning';

export const metadata: Metadata = {
  title: 'Scanning',
};

export default async function Page() {
  return <Scanning />;
}
