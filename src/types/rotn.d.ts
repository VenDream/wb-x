/*
 * ROTN Types
 *
 * @Author: VenDream
 * @Date: 2025-05-08 16:44:22
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

namespace ROTN {
  type Type = '' | 'RO' | 'TN';

  interface BrandItem {
    /** item id */
    id: string;
    /** type */
    type: Type;
    /** name */
    name: string;
    /** url */
    url: string;
    /** images */
    images: string[];
  }
}
