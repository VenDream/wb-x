/*
 * Common Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-20 16:29:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS, Lang } from '@/contants';
import enUS from '@/messages/en-US.json';
import zhCN from '@/messages/zh-CN.json';
import { createTranslator } from 'next-intl';

/**
 * get locale string
 *
 * @export
 * @param {string} key key
 * @param {Lang} lang lang
 */
export function getLocaleMessage(key: string, lang: Lang) {
  const t = createTranslator({
    locale: lang,
    messages: lang === LANGS.en ? enUS : zhCN,
  });
  return t(key);
}

/**
 * get local storage value
 *
 * @export
 * @template T value type
 * @param {string} key key
 */
export function getLocalStorageValue<T = Record<string, any>>(key: string) {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

/**
 * sleep for a period of time
 *
 * @export
 * @param {number} ms time in ms
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * copy text
 *
 * @export
 * @param {string} text text
 */
export function copyText(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

/**
 * format big number with units
 *
 * @export
 * @param {number} number number
 * @param {Lang} lang lang
 */
export function formatNumberWithUnit(number: number, lang: Lang) {
  const units =
    lang === LANGS.en
      ? ['', 'K', 'M', 'B', 'T']
      : ['', '万', '亿', '万亿', '亿亿'];

  const sep = lang === LANGS.en ? 3 : 4;
  const unitIdx = Math.floor((String(number).length - 1) / sep);

  if (unitIdx === 0) return String(number);

  const formattedNumber = (
    number / Math.pow(Math.pow(10, sep), unitIdx)
  ).toFixed(1);

  return formattedNumber + units[unitIdx];
}
