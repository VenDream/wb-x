/*
 * ID Utils
 *
 * @Author: VenDream
 * @Date: 2023-08-18 14:28:52
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/**
 * generate unique id with specific length
 *
 * @export
 * @param {number} n length
 */
export function generateId(n: number) {
  let id = '';
  while (id.length < n) {
    id += Math.random().toString(36).slice(2);
  }
  return id.slice(0, n);
}
