/*
 * ROTN Item
 *
 * @Author: VenDream
 * @Date: 2023-10-20 11:22:53
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbRotnItem } from '@/api/server';
import RotnItem from './item';

export default async function Page({ params }: ParamsBody) {
  const { id } = params;
  const item = await getDbRotnItem(id);

  return (
    <div className="rotn-item-detail h-full">
      <RotnItem item={item} />
    </div>
  );
}
