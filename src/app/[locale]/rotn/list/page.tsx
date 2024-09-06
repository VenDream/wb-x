/*
 * ROTN list page
 *
 * @Author: VenDream
 * @Date: 2024-07-17 14:53:32
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Metadata } from 'next';
import RotnList from './rotn-list';

export const metadata: Metadata = {
  title: 'ROTN',
};

export default function Page() {
  return <RotnList />;
}
