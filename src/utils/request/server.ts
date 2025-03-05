/*
 * Requester for server side
 *
 * @Author: VenDream
 * @Date: 2025-03-05 11:13:17
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { type Response, raiseRequestError } from '.';

/**
 * request.get
 *
 * @export
 * @template T
 * @param {string} url url
 * @param {RequestInit} [opts] opts
 */
export async function get<T = Record<string, any>>(
  url: string,
  opts?: RequestInit
) {
  try {
    const res = await fetch(url, opts);
    const { ok, code, data, errormsg } = (await res.json()) as Response<T>;

    if (!ok || +code !== 200) {
      return raiseRequestError(errormsg || 'Failed to fetch');
    }

    return data;
  } catch (err) {
    return raiseRequestError((err as Error).message);
  }
}

/**
 * request.post
 *
 * @export
 * @template T
 * @param {string} url url
 * @param {Record<string, any>} data data
 * @param {RequestInit} [opts] opts
 */
export async function post<T = Record<string, any>>(
  url: string,
  data: Record<string, any>,
  opts?: RequestInit
) {
  try {
    const res = await fetch(url, {
      ...opts,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const { ok, code, data: r, errormsg } = (await res.json()) as Response<T>;

    if (!ok || +code !== 200) {
      return raiseRequestError(errormsg || 'Failed to fetch');
    }

    return r;
  } catch (err) {
    return raiseRequestError((err as Error).message);
  }
}
