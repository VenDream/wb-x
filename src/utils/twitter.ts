/*
 * Twitter Utils
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:31:06
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { getFileName } from './common';
import { fixHttps } from './url';

interface ImageVariants {
  sm: string;
  md: string;
  lg: string;
  origin: string;
  filename?: string;
}

/**
 * get twitter image variants
 *
 * @export
 * @param {string} src image src
 */
export function getImageVariants(src: string) {
  const url = fixHttps(src);
  const filename = `${getFileName(url)}.jpg`;

  const variants: ImageVariants = {
    sm: url,
    md: url,
    lg: url,
    origin: url,
    filename,
  };

  // invalid src
  if (!src || !src.includes('pbs.twimg.com')) return variants;

  // process
  variants.sm = url.replace('name=orig', 'name=small');
  variants.md = url.replace('name=orig', 'name=medium');
  variants.lg = url.replace('name=orig', 'name=large');

  return variants;
}

/**
 * dedupe tweet list
 *
 * @export
 * @param {Twitter.Tweet[]} list tweet list
 */
export function dedupeTweetList(list: Twitter.Tweet[]) {
  const map = new Map<string, Twitter.Tweet>();
  list.forEach(tweet => {
    map.set(tweet.id, tweet);
  });
  return Array.from(map.values());
}
