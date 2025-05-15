/*
 * App Fonts
 *
 * @Author: VenDream
 * @Date: 2024-07-15 18:04:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Space_Grotesk } from 'next/font/google';
import LocalFont from 'next/font/local';

export const localFont = LocalFont({
  src: './ATCOverlook-Light.woff2',
  weight: '300',
  variable: '--font-atcoverlook',
});

export const googleFont = Space_Grotesk({
  weight: ['300'],
  subsets: ['latin'],
});
