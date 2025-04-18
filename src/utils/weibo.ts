/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/constants';
import dayjs, { EN, ZH } from '@/utils/dayjs';
import type { OpUnitType } from 'dayjs';
import { getLocale } from './common';
import { getAppSettings } from './settings';

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
  const { useImageProxy } = getAppSettings();

  if (!!useImageProxy && SINAIMG_PROXY) {
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
  const { useVideoProxy } = getAppSettings();

  if (!!useVideoProxy && SINAVIDEO_PROXY) {
    return `${SINAVIDEO_PROXY}?url=${encodeURIComponent(src)}`;
  }
  return src;
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

interface GetCreateTimeOptions {
  relative?: boolean;
  relativeUnit?: OpUnitType;
  relativeValue?: number;
  relativeAlways?: boolean;
}

type ConcreteGetCreateTimeOptions = {
  [key in keyof GetCreateTimeOptions]-?: GetCreateTimeOptions[key];
};

const DEFUALT_OPTIONS: GetCreateTimeOptions = {
  relative: true,
  relativeUnit: 'month',
  relativeValue: 6,
  relativeAlways: false,
};

/**
 * get weibo create time
 *
 * @export
 * @param {string} ct createtime
 * @param {GetCreateTimeOptions} [options] options
 */
export function getCreateTime(ct: string, options?: GetCreateTimeOptions) {
  const { relative, relativeUnit, relativeValue, relativeAlways } = {
    ...DEFUALT_OPTIONS,
    ...options,
  } as ConcreteGetCreateTimeOptions;

  const now = dayjs();
  const createtime = dayjs(ct);
  const diffs = now.diff(createtime, relativeUnit, true);

  if (!!relativeAlways || (!!relative && diffs < relativeValue)) {
    const locale = getLocale();
    return dayjs(ct)
      .locale(locale === LANGS.en ? EN : ZH)
      .fromNow();
  }

  return createtime.format('YYYY-MM-DD[\xa0\xa0]HH:mm');
}
