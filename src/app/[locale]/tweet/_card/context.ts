/*
 * Twitter Tweet Card Context
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:12:43
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { createContext } from 'react';
import type { CardContext, CardMenuOpts, CommentListContext } from './types';

const DEFAULT_MENU: CardMenuOpts = {
  copyId: true,
  dlImages: true,
  viewUserInfo: true,
  viewComments: true,
  viewOriginal: true,
  viewOpPosts: true,
};

const CardCtx = createContext<CardContext>({
  tweet: null,
  updateTweet: () => {},
  menu: DEFAULT_MENU,
  isComment: false,
  isRetweet: false,
  sourceTweetId: '',
});

const CommentListCtx = createContext<CommentListContext>({
  updateThread: () => {},
});

export { CardCtx, CommentListCtx, DEFAULT_MENU };
