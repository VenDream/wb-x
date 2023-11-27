/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { IMG_PLACEHOLDER } from '@/contants';

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
