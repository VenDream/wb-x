/*
 * Weibo Status Card Context
 *
 * @Author: VenDream
 * @Date: 2023-12-12 10:06:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { createContext } from 'react';
import type { CardContext, CardMenuOpts } from './types';

const DEFAULT_MENU: CardMenuOpts = {
  copyUid: true,
  dlImages: true,
  viewComments: true,
  viewOriginal: true,
};

const CardCtx = createContext<CardContext>({
  status: null,
  isRetweet: false,
  menu: DEFAULT_MENU,
});

export default CardCtx;
export { DEFAULT_MENU };