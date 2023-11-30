/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import dayjs from 'dayjs';

interface ImageVariants {
  sm: string;
  md: string;
  lg: string;
  origin: string;
  filename?: string;
}

/**
 * get weibo image variants
 *
 * @export
 * @param {string} src
 */
export function getImageVariants(src: string): ImageVariants {
  const defaultVariants: ImageVariants = {
    sm: src,
    md: src,
    lg: src,
    origin: src,
  };

  const fixHttps = (url: string) =>
    url.startsWith('//') ? `https:${url}` : url;

  // default src
  if (!src || src.includes('default')) return defaultVariants;

  // parse host and img
  const matchRegex =
    /((https:)?\/\/.+\.sinaimg\.cn)\/.+\/(.+\.(jpg|jpeg|gif|png)).*/;
  const [, host, , img] = src.match(matchRegex) || [];
  if (!host || !img) return defaultVariants;

  const sm = fixHttps(`${host}/orj360/${img}`);
  const md = fixHttps(`${host}/mw690/${img}`);
  const lg = fixHttps(`${host}/mw2000/${img}`);
  const origin = fixHttps(`${host}/large/${img}`);

  return { sm, md, lg, origin, filename: img };
}

/**
 * get weibo create time
 *
 * @export
 * @param {string} ct createtime
 */
export function getCreateTime(ct: string) {
  const createtime = dayjs(ct);
  if (createtime.year() === dayjs().year()) {
    return createtime.format('MM-DD[\xa0\xa0]HH:mm');
  } else {
    return createtime.format('YYYY-MM-DD[\xa0\xa0]HH:mm');
  }
}

/**
 * dedupe status list
 *
 * @export
 * @param {Backend.Status[]} list status list
 */
export function dedupeStatusList(list: Backend.Status[]) {
  const map = new Map<string, Backend.Status>();
  list.forEach(status => {
    map.set(status.id, status);
  });
  return Array.from(map.values());
}
