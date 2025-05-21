'use client';

/*
 * Requester for client side
 *
 * @Author: VenDream
 * @Date: 2025-03-05 11:13:18
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import axios, { type AxiosRequestConfig } from 'axios';
import { type Response, raiseRequestError } from '.';

const apiHost = process.env.NEXT_PUBLIC_API_HOST;

const instance = axios.create({
  baseURL: apiHost || '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  response => {
    const { ok, code, errormsg } = response.data as Response;
    if (!ok || +code !== 200) {
      raiseRequestError(errormsg || 'Failed to fetch');
    }
    return response;
  },
  error => {
    const response = error.response?.data as Response;
    const { errormsg } = response || {};
    raiseRequestError(errormsg || error.message || 'Failed to fetch');
  }
);

export async function get<T = Record<string, any>>(
  url: string,
  config?: AxiosRequestConfig
) {
  const { data: response } = await instance.get<Response<T>>(url, config);
  return response.data;
}

export async function post<T = Record<string, any>>(
  url: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig
) {
  const { data: response } = await instance.post<Response<T>>(
    url,
    data,
    config
  );
  return response.data;
}
