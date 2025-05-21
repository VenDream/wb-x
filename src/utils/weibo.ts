/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getAppSettings } from './settings';
import { fixHttps } from './url';

const IMAGE_PROXY = process.env.NEXT_PUBLIC_IMAGE_PROXY;
const VIDEO_PROXY = process.env.NEXT_PUBLIC_VIDEO_PROXY;

interface ImageVariants {
  sm: string; // w360
  md: string; // w690
  lg: string; // w2000

  bmiddle: string; // w440
  thumbnail: string; // w80
  woriginal: string; // woriginal

  origin: string; // original

  filename?: string;
}

/**
 * get weibo image variants
 *
 * @export
 * @param {string} src src
 */
export function getImageVariants(src: string): ImageVariants {
  const url = getProxiedImageUrl(src);
  const defaultVariants: ImageVariants = {
    sm: url,
    md: url,
    lg: url,
    bmiddle: url,
    thumbnail: url,
    woriginal: url,
    origin: url,
  };

  // default src
  if (!src || src.includes('default')) return defaultVariants;

  // parse host and img
  const matchRegex =
    /((https:)?\/\/.+\.sinaimg\.cn)\/.+\/(.+\.(jpg|jpeg|gif|png)).*/;
  const [, host, , img] = src.match(matchRegex) || [];
  if (!host || !img) return defaultVariants;

  const replacer = '{{variant}}';
  const tpl = fixHttps(`${host}/${replacer}/${img}`);

  const sm = getProxiedImageUrl(tpl.replace(replacer, 'orj360'));
  const md = getProxiedImageUrl(tpl.replace(replacer, 'mw690'));
  const lg = getProxiedImageUrl(tpl.replace(replacer, 'mw2000'));
  const bmiddle = getProxiedImageUrl(tpl.replace(replacer, 'bmiddle'));
  const thumbnail = getProxiedImageUrl(tpl.replace(replacer, 'thumbnail'));
  const woriginal = getProxiedImageUrl(tpl.replace(replacer, 'woriginal'));
  const origin = getProxiedImageUrl(tpl.replace(replacer, 'large'));

  return { sm, md, lg, bmiddle, thumbnail, woriginal, origin, filename: img };
}

/**
 * get proxied weibo image url
 *
 * @export
 * @param {string} src src
 */
export function getProxiedImageUrl(src: string) {
  const { useImageProxy } = getAppSettings();

  if (!!useImageProxy && IMAGE_PROXY) {
    return `${IMAGE_PROXY}?url=${encodeURIComponent(src)}`;
  }
  return src;
}

/**
 * get proxied weibo video url
 *
 * @export
 * @param {string} src src
 */
export function getProxiedVideoUrl(src: string) {
  const { useVideoProxy } = getAppSettings();

  if (!!useVideoProxy && VIDEO_PROXY) {
    return `${VIDEO_PROXY}?url=${encodeURIComponent(src)}`;
  }
  return src;
}

/**
 * dedupe status list
 *
 * @export
 * @param {Weibo.Status[]} list status list
 */
export function dedupeStatusList(list: Weibo.Status[]) {
  const map = new Map<string, Weibo.Status>();
  list.forEach(status => {
    map.set(status.id, status);
  });
  return Array.from(map.values());
}
