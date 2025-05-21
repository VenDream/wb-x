/*
 * App Fonts
 *
 * @Author: VenDream
 * @Date: 2024-07-15 18:04:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Quicksand } from 'next/font/google';
import LocalFont from 'next/font/local';

const localFont = LocalFont({
  src: './ATCOverlook-Light.woff2',
  weight: '300',
  variable: '--font-atcoverlook',
});

/**
 * @see https://fonts.google.com
 */
const googleFont = Quicksand({
  weight: ['400'],
  subsets: ['latin'],
});

const USE_LOCAL_FONT = false;

export const font = USE_LOCAL_FONT ? localFont : googleFont;
