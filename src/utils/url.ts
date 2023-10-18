/*
 * URL Utils
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:39:20
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/**
 * append url params
 *
 * @export
 * @param {string} url url
 * @param {Record<string, any>} params params
 */
export function appendURLParams(url: string, params: Record<string, any>) {
  const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
  const _url = new URL(fullUrl);
  for (const [k, v] of Object.entries(params)) {
    _url.searchParams.append(k, encodeURIComponent(v));
  }
  return _url.href;
}
