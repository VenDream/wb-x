/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import DEFAULT_SETTINGS from '@/app/[locale]/settings/defaults';
import type { LocalSettings } from '@/app/[locale]/settings/page';
import { LS_KEYS } from '@/contants';
import dayjs from 'dayjs';
import { getLocalStorageValue } from './common';

const SINAIMG_PROXY = process.env.NEXT_PUBLIC_SINAIMG_PROXY;
const SINAVIDEO_PROXY = process.env.NEXT_PUBLIC_SINAVIDEO_PROXY;

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

  const fixHttps = (url: string) =>
    url.startsWith('//') ? `https:${url}` : url;

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
  const settings =
    getLocalStorageValue<LocalSettings>(LS_KEYS.SETTINGS) || DEFAULT_SETTINGS;

  if (!!settings.useImageProxy && SINAIMG_PROXY) {
    return `${SINAIMG_PROXY}?url=${encodeURIComponent(src)}`;
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
  const settings =
    getLocalStorageValue<LocalSettings>(LS_KEYS.SETTINGS) || DEFAULT_SETTINGS;

  if (!!settings.useVideoProxy && SINAVIDEO_PROXY) {
    return `${SINAVIDEO_PROXY}?url=${encodeURIComponent(src)}`;
  }
  return src;
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
