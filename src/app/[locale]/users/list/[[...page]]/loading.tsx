/*
 * Loading UI
 *
 * @Author: VenDream
 * @Date: 2023-09-28 14:33:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Loading } from '@/components/daisyui';

export default function LoadingUI() {
  return (
    <div className="flex h-48 items-center justify-center">
      <Loading color="primary"></Loading>
    </div>
  );
}
