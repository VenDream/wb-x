/*
 * API Hosts
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:28:52
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/**
 * get serverside api host
 *
 * @export
 */
export function getApiHost() {
  return process.env.WEIBO_API;
}
