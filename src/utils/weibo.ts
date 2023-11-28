/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { IMG_PLACEHOLDER } from '@/contants';
import dayjs from 'dayjs';

interface ImageVariants {
  sm: string;
  md: string;
  lg: string;
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

  const sm = !IMG_PLACEHOLDER || fixHttps(`${host}/orj360/${img}`);
  const md = !IMG_PLACEHOLDER || fixHttps(`${host}/mw690/${img}`);
  const lg = !IMG_PLACEHOLDER || fixHttps(`${host}/large/${img}`);

  return { sm, md, lg, filename: img };
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
