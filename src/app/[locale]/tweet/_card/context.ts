/*
 * Twitter Tweet Card Context
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:12:43
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { createContext } from 'react';
import type { CardContext, CardMenuOpts } from './types';

const DEFAULT_MENU: CardMenuOpts = {
  copyId: true,
  copyUid: true,
  dlImages: true,
  viewComments: true,
  viewOriginal: true,
  viewOpPosts: true,
};

const CardCtx = createContext<CardContext>({
  tweet: null,
  menu: DEFAULT_MENU,
  isRetweet: false,
  sourceTweetId: '',
});

export default CardCtx;
export { DEFAULT_MENU };
