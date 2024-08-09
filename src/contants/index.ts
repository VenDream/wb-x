/*
 * Constants
 *
 * @Author: VenDream
 * @Date: 2023-06-09 12:02:25
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Metadata } from 'next';

export const APP_NAME = 'WB-X';
export const META_DATA: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'The X makes it sound cool~',
};

/** locales */
export const LANGS = {
  en: 'en-US',
  zh: 'zh-CN',
};
export type Lang = keyof typeof LANGS;

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
  STATUS_DETAIL: '/status/detail',
};

export const WEIBO_HOST = 'https://weibo.com';
export const WEIBO_IMAGES_DOWNLOAD_API =
  '/api/weibo/status/images?responseType=zip';

/** localStorage keys */
export const LS_KEYS = {
  THEME: 'WB_X_THEME',
  SETTINGS: 'WB_X_SETTINGS',
};

export const PAGINATION_LIMIT = 10;
export const MIN_IMAGES_COUNT = 0;
export const MAX_IMAGES_COUNT = 18;

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

export const DARK_THEMES = [
  'dark',
  'synthwave',
  'halloween',
  'forest',
  'aqua',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
];

export const IMG_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWw6c3BhY2U9InByZXNlcnZlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeT0iMCIgeD0iMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0i5ZyW5bGkXzEiIHZlcnNpb249IjEuMSIgc3R5bGU9Im1hcmdpbjogaW5pdGlhbDsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bzsgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpOyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyBjbGFzcz0ibGRsLXNjYWxlIiBzdHlsZT0idHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgc2NhbGUoMC44LCAwLjgpOyI+PGcgY2xhc3M9ImxkbC1hbmkiPjxnIGNsYXNzPSJsZGwtbGF5ZXIiPjxnIGNsYXNzPSJsZGwtYW5pIiBzdHlsZT0ib3BhY2l0eTogMTsgdHJhbnNmb3JtLW9yaWdpbjogNTBweCA1MHB4OyB0cmFuc2Zvcm06IG1hdHJpeDNkKDAuOTEsIDAsIDAsIDAsIDAsIDAuOTEsIDAsIDAsIDAsIDAsIDAuOTEsIDAsIDAsIDAsIDAsIDEpOyBhbmltYXRpb246IDFzIGxpbmVhciAtMC42NjY2NjdzIGluZmluaXRlIG5vcm1hbCBmb3J3YXJkcyBydW5uaW5nIGFuaW1hdGU7IHRyYW5zZm9ybS1ib3g6IHZpZXctYm94OyI+PHBhdGggZD0iTTEwIDIxLjdoODB2NTYuN0gxMHoiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjMuNSIgc3Ryb2tlPSIjMzMzIiBmaWxsPSIjYTBjOGQ3IiBzdHlsZT0ic3Ryb2tlLXdpZHRoOiAzLjU7IGZpbGw6IHJnYigxNjAsIDIwMCwgMjE1KTsgc3Ryb2tlOiByZ2IoNTEsIDUxLCA1MSk7Ij48L3BhdGg+PC9nPjwvZz48ZyBjbGFzcz0ibGRsLWxheWVyIj48ZyBjbGFzcz0ibGRsLWFuaSIgc3R5bGU9Im9wYWNpdHk6IDE7IHRyYW5zZm9ybS1vcmlnaW46IDUwcHggNTBweDsgdHJhbnNmb3JtOiBtYXRyaXgzZCgwLjkxLCAwLCAwLCAwLCAwLCAwLjkxLCAwLCAwLCAwLCAwLCAwLjkxLCAwLCAwLCAwLCAwLCAxKTsgYW5pbWF0aW9uOiAxcyBsaW5lYXIgLTAuODMzMzMzcyBpbmZpbml0ZSBub3JtYWwgZm9yd2FyZHMgcnVubmluZyBhbmltYXRlOyB0cmFuc2Zvcm0tYm94OiB2aWV3LWJveDsiPjxjaXJjbGUgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2U9IiMzMzMiIGZpbGw9IiNmNWU2YzgiIHI9IjEwLjciIGN5PSI0Mi41IiBjeD0iNjQiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDMuNTsgZmlsbDogcmdiKDI0NSwgMjMwLCAyMDApOyBzdHJva2U6IHJnYig1MSwgNTEsIDUxKTsiPjwvY2lyY2xlPjwvZz48L2c+PGcgY2xhc3M9ImxkbC1sYXllciI+PGcgY2xhc3M9ImxkbC1hbmkiIHN0eWxlPSJvcGFjaXR5OiAxOyB0cmFuc2Zvcm0tb3JpZ2luOiA1MHB4IDUwcHg7IHRyYW5zZm9ybTogbWF0cml4M2QoMC45MSwgMCwgMCwgMCwgMCwgMC45MSwgMCwgMCwgMCwgMCwgMC45MSwgMCwgMCwgMCwgMCwgMSk7IGFuaW1hdGlvbjogMXMgbGluZWFyIC0xcyBpbmZpbml0ZSBub3JtYWwgZm9yd2FyZHMgcnVubmluZyBhbmltYXRlOyB0cmFuc2Zvcm0tYm94OiB2aWV3LWJveDsiPjxwYXRoIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSIjYWJiZDgxIiBkPSJNNTcuOCA0My43TDUwIDUyIDM3LjkgMzcuN2MtMS4zLTEuNi0zLjgtMS42LTUuMiAwTDEwIDY0djE0LjNoODBWNzVMNjIuOCA0My44Yy0xLjMtMS41LTMuNy0xLjUtNS0uMXoiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDMuNTsgZmlsbDogcmdiKDE3MSwgMTg5LCAxMjkpOyBzdHJva2U6IHJnYig1MSwgNTEsIDUxKTsiPjwvcGF0aD48L2c+PC9nPjxtZXRhZGF0YSB4bWxuczpkPSJodHRwczovL2xvYWRpbmcuaW8vc3RvY2svIj48L21ldGFkYXRhPjwvZz48L2c+PC9zdmc+Cg==';

export const IMG_ERROR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjE2IDQySDQwYTE0IDE0IDAgMCAwLTE0IDE0djE0NGExNCAxNCAwIDAgMCAxNCAxNGg2NGE2IDYgMCAwIDAgNS42OS00LjFsMTUuMTItNDUuMzZsMzcuNDItMTVhNiA2IDAgMCAwIDMuMzQtMy4zNGwxNS0zNy40Mmw0NS4zMy0xNS4wOUE2IDYgMCAwIDAgMjMwIDg4VjU2YTE0IDE0IDAgMCAwLTE0LTE0bS05OC4yMyAxMTIuNDNhNiA2IDAgMCAwLTMuNDYgMy42N0w5OS42OCAyMDJINDBhMiAyIDAgMCAxLTItMnYtMjguODNsNTIuNTgtNTIuNThhMiAyIDAgMCAxIDIuODMgMEwxMjYgMTUxLjE1Wk0yMTggODMuNjhsLTQzLjkgMTQuNjNhNiA2IDAgMCAwLTMuNjcgMy40NmwtMTUuMDUgMzcuNjFsLTE3LjI4IDYuOTJsLTM2LjItMzYuMmExNCAxNCAwIDAgMC0xOS44IDBMMzggMTU0LjJWNTZhMiAyIDAgMCAxIDItMmgxNzZhMiAyIDAgMCAxIDIgMlptOS41MSAzMy4xOGE2IDYgMCAwIDAtNS40MS0uODJMMTk4LjMgMTI0YTYgNiAwIDAgMC0zLjY3IDMuNDdMMTgwIDE2NGwtMzYuNTYgMTQuNjNhNiA2IDAgMCAwLTMuNDQgMy42N2wtOCAyMy44YTYgNiAwIDAgMCA1LjY5IDcuOUgyMTZhMTQgMTQgMCAwIDAgMTQtMTR2LTc4LjI3YTYgNiAwIDAgMC0yLjQ5LTQuODdNMjE4IDIwMGEyIDIgMCAwIDEtMiAyaC02OS45NGw0LjQyLTEzLjI2bDM2LjM3LTE0LjU1YTYgNiAwIDAgMCAzLjM0LTMuMzRsMTQuNTUtMzYuMzdsMTMuMjYtNC40MloiLz48L3N2Zz4=';
