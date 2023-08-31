/*
 * API Hosts
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:28:52
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { headers } from 'next/headers';

/**
 * get serverside api host
 *
 * @export
 */
export function getApiHost() {
  const protocol = process.env.NODE_ENV === 'development' ? 'http:' : 'https:';
  const host = headers().get('host');
  return protocol + host;
}
