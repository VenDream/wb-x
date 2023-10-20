/*
 * ROTN Item detail modal
 *
 * @Author: VenDream
 * @Date: 2023-10-20 11:37:45
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbRotnItem } from '@/api/server';
import RotnItemDetailModal from './modal';

export default async function Page({ params }: ParamsBody) {
  const { id } = params;
  const item = await getDbRotnItem(id);

  return <RotnItemDetailModal item={item} />;
}
