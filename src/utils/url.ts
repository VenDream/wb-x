/*
 * URL Utils
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:39:20
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/**
 * fix url protocol to https
 *
 * @export
 * @param {string} url url
 */
export function fixHttps(url: string) {
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('http:')) return url.replace('http:', 'https:');
  return url;
}

/**
 * append url params
 *
 * @export
 * @param {string} url url
 * @param {Record<string, any>} params params
 */
export function appendURLParams(url: string, params: Record<string, any>) {
  const [srcUrl, query = ''] = url.split('?');
  const qs = new URLSearchParams(query);

  for (const [k, v] of Object.entries(params)) {
    if (v === '' || v === undefined || v === null) continue;
    qs.set(k, v);
  }

  const qsStr = qs.toString();
  return `${srcUrl}${qsStr ? `?${qsStr}` : ''}`;
}
