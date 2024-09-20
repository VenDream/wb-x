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
 * get locale
 *
 * @export
 */
export function getLocale() {
  // if (typeof window === 'undefined') return LANGS.en;
  const html = document.documentElement;
  return (html.getAttribute('lang') as Lang) || LANGS.en;
}

/**
 * get locale string
 *
 * @export
 * @param {string} key key
 */
export function getLocaleMessage(key: string) {
  const locale = getLocale();
  const t = createTranslator({
    locale,
    messages: locale === LANGS.en ? enUS : zhCN,
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
 * set local storage value
 *
 * @export
 * @param {string} key key
 * @param {*} value value
 */
export function setLocalStorageValue(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: value }));
  } catch {}
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
 */
export function formatNumberWithUnit(number: number) {
  const locale = getLocale();
  const units =
    locale === LANGS.en
      ? ['', 'K', 'M', 'B', 'T']
      : ['', '万', '亿', '万亿', '亿亿'];

  const sep = locale === LANGS.en ? 3 : 4;
  const unitIdx = Math.floor((String(number).length - 1) / sep);

  if (unitIdx === 0) return String(number);

  const formattedNumber = (
    number / Math.pow(Math.pow(10, sep), unitIdx)
  ).toFixed(1);

  return formattedNumber + units[unitIdx];
}

export function getFileName(url: string) {
  const match = url.match(/.*\/(.+)/);
  return match ? match[1].split('?')[0] : '';
}

/**
 * get scrollable ancestor
 *
 * @export
 * @param {(HTMLElement)} element element
 */
export function getScrollableAncestor(element: HTMLElement) {
  let ancestor = element;

  const isScrollable = (element: HTMLElement) => {
    return (
      'radixScrollAreaViewport' in element.dataset ||
      element.scrollHeight > element.clientHeight
    );
  };

  while (ancestor.parentElement) {
    ancestor = ancestor.parentElement;
    if (isScrollable(ancestor)) return ancestor;
  }

  return null;
}

/**
 * get trimed html string
 *
 * @export
 * @param {string} str string
 */
export function htmlString(str: string) {
  return str
    .split('\n')
    .map(s => s.trim())
    .join('');
}
