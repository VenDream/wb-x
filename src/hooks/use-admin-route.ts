/*
 * useIsAdminRoute
 *
 * @Author: VenDream
 * @Date: 2024-11-06 14:03:21
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { ADMIN_ROUTES } from '@/constants';
import { usePathname } from '@/i18n/routing';
import { useMemo } from 'react';

export default function useAdminRoute() {
  const pathname = usePathname();
  const isAdminRoute = useMemo(() => {
    return Object.values(ADMIN_ROUTES).some(p => pathname.startsWith(p));
  }, [pathname]);

  return isAdminRoute;
}
