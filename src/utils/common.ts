/*
 * Common Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-20 16:29:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LANGS, type Lang } from '@/constants';

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
 * @param {number} [fixed] fixed digits
 */
export function formatNumberWithUnit(number: number, fixed = 1) {
  const locale = getLocale();
  const units =
    locale === LANGS.en
      ? ['', 'K', 'M', 'B', 'T']
      : ['', '万', '亿', '万亿', '亿亿'];

  const sep = locale === LANGS.en ? 3 : 4;
  const unitIdx = Math.floor((String(number).length - 1) / sep);

  if (unitIdx === 0) return String(number);

  const formattedNumber = (number / (10 ** sep) ** unitIdx).toFixed(fixed);

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
      (element.scrollHeight > element.clientHeight &&
        window.getComputedStyle(element).overflowY !== 'visible')
    );
  };

  while (ancestor.parentElement) {
    ancestor = ancestor.parentElement;
    if (isScrollable(ancestor)) return ancestor;
  }

  return null;
}

/**
 * pick object properties
 *
 * @export
 * @template T
 * @param {T} obj object
 * @param {(keyof T)[]} keys keys to pick
 */
export function pick<T extends Record<string, any>>(obj: T, keys: (keyof T)[]) {
  return keys.reduce((prev, key) => {
    prev[key] = obj[key];
    return prev;
  }, {} as Partial<T>);
}

/**
 * omit object properties
 *
 * @export
 * @template T
 * @param {T} obj object
 * @param {(keyof T)[]} keys keys to omit
 */
export function omit<T extends Record<string, any>>(obj: T, keys: (keyof T)[]) {
  return (Object.keys(obj) as (keyof T)[]).reduce((prev, key) => {
    if (!keys.includes(key)) prev[key] = obj[key];
    return prev;
  }, {} as Partial<T>);
}

/**
 * get random integer
 *
 * @export
 * @param {number} min min
 * @param {number} max max
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * generate unique id
 *
 * @export
 * @param {number} [n] length
 */
export function genUniqueId(n = 6) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let id = '';
  for (let i = 0; i < n; i += 1) {
    id += chars[getRandomInt(0, chars.length - 1)];
  }
  return id;
}

/**
 * convert camel case to kebab case
 *
 * @export
 * @param {string} str string
 */
export function camel2Kebab(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * extract plain text from rich text
 *
 * @export
 * @param {string} richText rich text
 */
export function extractPlainTextFromRichText(richText: string) {
  if (typeof window === 'undefined' || !richText) return '';

  const div = document.createElement('div');
  div.innerHTML = richText;

  return div.textContent || '';
}
