/*
 * Weibo Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-23 21:11:31
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

export function getImageVariants(url: string) {
  return {
    sm: url.replace('large', 'orj360'),
    md: url.replace('large', 'mw690'),
    lg: url,
  };
}
