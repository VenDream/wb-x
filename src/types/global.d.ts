/*
 * Global Types
 *
 * @Author: VenDream
 * @Date: 2025-05-08 16:36:22
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import type { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';

declare global {
  type ChildrenProps<T = any> = PropsWithChildren<T>;
  type ParamsBody = {
    params: Promise<Record<string, any>>;
    searchParams: Promise<Record<string, any>>;
  };

  interface PaginationParams {
    /** limit */
    limit?: number;
    /** offset */
    offset?: number;
    /** return total or not */
    needTotal?: boolean;
  }

  type TFunction = ReturnType<typeof useTranslations>;

  type Platform = Weibo.Platform | Twitter.Platform;
}

declare module 'react' {
  declare function IForwardRef<T, P = Record<string, any>>(
    render: (props: P, ref: Ref<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
