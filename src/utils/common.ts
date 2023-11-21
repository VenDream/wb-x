/*
 * Common Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-20 16:29:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/**
 * sleep for a period of time
 *
 * @export
 * @param {number} ms time in ms
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
