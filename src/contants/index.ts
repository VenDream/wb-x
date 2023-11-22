/*
 * Constants
 *
 * @Author: VenDream
 * @Date: 2023-06-09 12:02:25
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import React from 'react';

/** locales */
export const LANGS = {
  en: 'en-US',
  zh: 'zh-CN',
};

/** main route paths */
export const MAIN_ROUTES = {
  HOME: '/',
  WEIBO: '/status/list',
  ROTN: '/rotn/list',
  USER: '/user/list',
  SETTINGS: '/settings',
};

/** secondary route paths */
export const SECONDARY_ROUTES = {
  USER_TIMELINE: '/user/timeline',
  STATUS_DETAIL: '/status/detail',
  ROTN_ITEM_DETAIL: '/rotn/item',
};

/** localStorage keys */
export const LS_KEYS = {
  THEME: 'WB_X_THEME',
};

export const PAGINATION_LIMIT = 10;

/**
 * themes
 * @refer https://daisyui.com/docs/themes/
 */
export const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

export const IMG_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik01IDIxcS0uODI1IDAtMS40MTMtLjU4OFQzIDE5VjVxMC0uODI1LjU4OC0xLjQxM1Q1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg4IDEuNDEzVDE5IDIxSDVabTAtMmgxNFY1SDV2MTRabTAgMFY1djE0Wm0yLTJoMTBxLjMgMCAuNDUtLjI3NXQtLjA1LS41MjVsLTIuNzUtMy42NzVxLS4xNS0uMi0uNC0uMnQtLjQuMkwxMS4yNSAxNkw5LjQgMTMuNTI1cS0uMTUtLjItLjQtLjJ0LS40LjJsLTIgMi42NzVxLS4yLjI1LS4wNS41MjVUNyAxN1ptMS41LTdxLjYyNSAwIDEuMDYzLS40MzhUMTAgOC41cTAtLjYyNS0uNDM4LTEuMDYzVDguNSA3cS0uNjI1IDAtMS4wNjMuNDM4VDcgOC41cTAgLjYyNS40MzggMS4wNjNUOC41IDEwWiIvPjwvc3ZnPg==';

export const IMG_ERROR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik01IDIxcS0uODI1IDAtMS40MTMtLjU4OFQzIDE5VjVxMC0uODI1LjU4OC0xLjQxM1Q1IDNoMTRxLjgyNSAwIDEuNDEzLjU4OFQyMSA1djE0cTAgLjgyNS0uNTg4IDEuNDEzVDE5IDIxSDVabTEtOC40MjVsNC00bDQgNGw0LTRsMSAxVjVINXY2LjU3NWwxIDFaTTUgMTloMTR2LTYuNmwtMS0xbC00IDRsLTQtNGwtNCA0bC0xLTFWMTlabTAgMHYtNi42djJWNXYxNFoiLz48L3N2Zz4=';

export const NO_DATA =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTQgMTQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHg9Ii41IiB5PSIuNSIgcng9IjEiLz48cGF0aCBkPSJNLjUgOEg0YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDQgMGExIDEgMCAwIDEgMS0xaDMuNSIvPjwvZz48L3N2Zz4=';

export type PRESET_STYLE = 'TWO_LINE_ELLIPSIS_TEXT';
export const STYLES: Record<PRESET_STYLE, React.CSSProperties> = {
  TWO_LINE_ELLIPSIS_TEXT: {
    overflow: 'hidden',
    lineHeight: 1.5,
    height: '3em',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
};
