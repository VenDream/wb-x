/*
 * ROTN Clientside APIs
 *
 * @Author: VenDream
 * @Date: 2025-05-09 14:44:46
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { get } from '@/utils/request/client';
import { appendURLParams } from '@/utils/url';

type ROTNListParams = PaginationParams & {
  id?: string;
  type?: ROTN.Type;
};

export async function getItemList(params: ROTNListParams) {
  let url = '/api/db/rotn/items/list';
  url = appendURLParams(url, params);
  const items = await get<DB.List<ROTN.BrandItem>>(url);
  return items;
}
