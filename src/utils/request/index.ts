/*
 * Request Utils
 *
 * @Author: VenDream
 * @Date: 2025-03-05 11:14:03
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

export interface Response<T = Record<string, any>> {
  ok: boolean;
  code: number;
  data: T;
  errormsg: string | null;
}

export const raiseRequestError = (msg?: string) => {
  throw new Error(msg || 'Failed to fetch');
};
