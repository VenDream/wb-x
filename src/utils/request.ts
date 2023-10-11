/*
 * Request Utils
 *
 * @Author: VenDream
 * @Date: 2023-08-25 11:18:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { RequestInit } from 'next/dist/server/web/spec-extension/request';

interface Response<T = Record<string, any>> {
  code: number;
  data: T;
  errormsg: string | null;
}

const raiseRequestError = (msg: string) => {
  throw new Error(msg || 'Failed to fetch');
};

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
    const { code, data, errormsg } = (await res.json()) as Response<T>;

    if (+code !== 200 || errormsg) {
      return raiseRequestError(errormsg!);
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
    const { code, data: r, errormsg } = (await res.json()) as Response<T>;

    if (+code !== 200 || errormsg) {
      return raiseRequestError(errormsg!);
    }

    return r;
  } catch (err) {
    return raiseRequestError((err as Error).message);
  }
}
