/*
 * Constants
 *
 * @Author: VenDream
 * @Date: 2023-06-09 12:02:25
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import type { Metadata } from 'next';

/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */

export const APP_NAME = 'WB-X';
export const META_DATA: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'The X makes it sound cool~',
};

export const LANGS = {
  en: 'en-US',
  zh: 'zh-CN',
} as const;

export type Lang = (typeof LANGS)[keyof typeof LANGS];

export const DEFAULT_FAV_UID = 'yeshenxue@qq.com';
export const WEIBO_HOST = 'https://weibo.com';
export const TWITTER_HOST = 'https://x.com';

export const LS_KEYS = {
  THEME: 'WB_X_THEME',
  SETTINGS: 'WB_X_SETTINGS',
};

export const UNAUTHORIZED_CONVERSATION_TWEET =
  'UNAUTHORIZED_CONVERSATION_TWEET';
export const DELETED_CONVERSATION_TWEET = 'DELETED_CONVERSATION_TWEET';

export const PAGINATION_LIMIT = 10;
export const COMMENTS_PAGE_SIZE = 20;
export const COMMENTS_REPLIES_PAGE_SIZE = 20;
export const MIN_IMAGES_NUM = 0;
export const MAX_IMAGES_NUM = 18;
export const ESTIMATE_COUNT = 1000.1;

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

export const PRIMARY_ROUTE_KEYS = [
  'HOME',
  'WEIBO',
  'TWITTER',
  'ROTN',
  'USERS',
  'TRACKINGS',
  'SETTINGS',
] as const;
export type PrimaryRouteKey = (typeof PRIMARY_ROUTE_KEYS)[number];

export const PRIMARY_ROUTES: Record<PrimaryRouteKey, string> = {
  HOME: '/',
  WEIBO: '/status/list',
  TWITTER: '/tweet/list',
  ROTN: '/rotn/list',
  USERS: '/user/list',
  TRACKINGS: '/trackings',
  SETTINGS: '/settings',
};

export const SECONDARY_ROUTE_KEYS = ['STATUS_DETAIL', 'TWEET_DETAIL'] as const;
export type SecondaryRouteKey = (typeof SECONDARY_ROUTE_KEYS)[number];

export const SECONDARY_ROUTES: Record<SecondaryRouteKey, string> = {
  STATUS_DETAIL: '/status/detail',
  TWEET_DETAIL: '/tweet/detail',
};

export const ADMIN_ROUTES: Partial<typeof PRIMARY_ROUTES> = {
  TWITTER: PRIMARY_ROUTES.TWITTER,
  ROTN: PRIMARY_ROUTES.ROTN,
  USERS: PRIMARY_ROUTES.USERS,
  TRACKINGS: PRIMARY_ROUTES.TRACKINGS,
};

/* -------------------------------------------------------------------------- */
/*                                   THEMES                                   */
/* -------------------------------------------------------------------------- */

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
  'dim',
  'nord',
  'sunset',
  'caramellatte',
  'abyss',
  'silk',
] as const;

export const DARK_THEMES: Partial<(typeof THEMES)[number]>[] = [
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
  'dim',
  'sunset',
  'abyss',
] as const;

/* -------------------------------------------------------------------------- */
/*                                   ASSETS                                   */
/* -------------------------------------------------------------------------- */

export const IMG_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWw6c3BhY2U9InByZXNlcnZlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeT0iMCIgeD0iMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSJtYXJnaW46IGluaXRpYWw7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87IGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KTsiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGcgY2xhc3M9ImxkbC1zY2FsZSIgc3R5bGU9InRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHNjYWxlKDAuOCwgMC44KTsiPjxnIGNsYXNzPSJsZGwtYW5pIj48ZyBjbGFzcz0ibGRsLWxheWVyIj48ZyBjbGFzcz0ibGRsLWFuaSIgc3R5bGU9Im9wYWNpdHk6IDE7Ij48cGF0aCBkPSJNMTAgMjEuN2g4MHY1Ni43SDEweiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMzMzMiIGZpbGw9IiNhMGM4ZDciIHN0eWxlPSJzdHJva2Utd2lkdGg6IDEuNTsgZmlsbDogcmdiKDE2MCwgMjAwLCAyMTUpOyBzdHJva2U6IHJnYig1MSwgNTEsIDUxKTsiPjwvcGF0aD48L2c+PC9nPjxnIGNsYXNzPSJsZGwtbGF5ZXIiPjxnIGNsYXNzPSJsZGwtYW5pIiBzdHlsZT0ib3BhY2l0eTogMTsiPjxjaXJjbGUgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMzMzMiIGZpbGw9IiNmNWU2YzgiIHI9IjEwLjciIGN5PSI0Mi41IiBjeD0iNjQiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDEuNTsgZmlsbDogcmdiKDI0NSwgMjMwLCAyMDApOyBzdHJva2U6IHJnYig1MSwgNTEsIDUxKTsiPjwvY2lyY2xlPjwvZz48L2c+PGcgY2xhc3M9ImxkbC1sYXllciI+PGcgY2xhc3M9ImxkbC1hbmkiIHN0eWxlPSJvcGFjaXR5OiAxOyI+PHBhdGggc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMzMzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9IiNhYmJkODEiIGQ9Ik01Ny44IDQzLjdMNTAgNTIgMzcuOSAzNy43Yy0xLjMtMS42LTMuOC0xLjYtNS4yIDBMMTAgNjR2MTQuM2g4MFY3NUw2Mi44IDQzLjhjLTEuMy0xLjUtMy43LTEuNS01LS4xeiIgc3R5bGU9InN0cm9rZS13aWR0aDogMS41OyBmaWxsOiByZ2IoMTcxLCAxODksIDEyOSk7IHN0cm9rZTogcmdiKDUxLCA1MSwgNTEpOyI+PC9wYXRoPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4=';

export const IMG_ERROR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWw6c3BhY2U9InByZXNlcnZlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeT0iMCIgeD0iMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSJtYXJnaW46IGluaXRpYWw7IGRpc3BsYXk6IGJsb2NrOyBzaGFwZS1yZW5kZXJpbmc6IGF1dG87IGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KTsiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGcgY2xhc3M9ImxkbC1zY2FsZSI+PGcgY2xhc3M9ImxkbC1hbmkiPjxnIGNsYXNzPSJsZGwtbGF5ZXIiPjxnIGNsYXNzPSJsZGwtYW5pIiBzdHlsZT0ib3BhY2l0eTogMTsiPjxwYXRoIGZpbGw9IiNlMTViNjQiIGQ9Ik0xNC42NTMgODUuNDg3Yy0zLjEzOC0xLjgwNi00LjE2Ny02LjAwOC0yLjE5OC05LjEyIDguNDAxLTEzLjI4MiAxOC4zNC0yNS4zMjkgMjkuMTc3LTM2LjA5OSAxMC45MTYtMTAuODY0IDIyLjcwOC0yMC40OSAzNC45MTMtMjkuMjczIDIuNzcyLTEuOTk1IDYuNTctMS4zNDQgOC41NTcgMS40ODUgMS45MjggMi43NDQgMS40NzEgNi41NzgtMS4wNiA4LjczMi0xMS4xMTEgOS40NTYtMjEuNTkxIDE5LjU1OC0zMC45NSAzMC41MTdDNDMuODc2IDYyLjUgMzUuNzg2IDc0LjEyIDI5LjI0OCA4Ni40ODhjLTEuNjUzIDMuMTI2LTUuNDIzIDQuMjc2LTguNDI5IDIuNTQ3bC02LjE2Ni0zLjU0OHoiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDE7IGZpbGw6IHJnYigyMjUsIDkxLCAxMDApOyI+PC9wYXRoPjwvZz48L2c+PGcgY2xhc3M9ImxkbC1sYXllciI+PGcgY2xhc3M9ImxkbC1hbmkiIHN0eWxlPSJvcGFjaXR5OiAxOyI+PHBhdGggZmlsbD0iI2UxNWI2NCIgZD0iTTc4LjczOSA4Mi40MzhjLTMuMDY3IDEuODA0LTcuMDQxLjg3Mi04LjkxNi0yLjE1Mi02LjM2Ny0xMC4yNjctMTQuNTQzLTE5LjcxOC0yMy42OTgtMjguMzk3LTkuMzA2LTguODI3LTE5LjU4Ny0xNi45MDYtMzAuMjktMjQuNTk0YTYuNTk0IDYuNTk0IDAgMCAxLTEuNjgyLTguOTQ4bDEuMjMtMS44OTVhNi42MDkgNi42MDkgMCAwIDEgOS4wMy0yLjAxMmMxMS41NzEgNy4xOSAyMi45NjIgMTQuOTQzIDMzLjczNSAyMy44NjQgMTAuNjczIDguODUxIDIwLjc3NyAxOC45NTggMjkuMTYyIDMwLjcyMSAyLjI1NiAzLjE2NSAxLjMzNyA3LjU4NC0yLjAxNCA5LjU1NWwtNi41NTcgMy44NTh6IiBzdHlsZT0ic3Ryb2tlLXdpZHRoOiAxOyBmaWxsOiByZ2IoMjI1LCA5MSwgMTAwKTsiPjwvcGF0aD48L2c+PC9nPjwvZz48L2c+PC9zdmc+';
