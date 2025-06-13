/*
 * useIsFullPage
 *
 * @Author: VenDream
 * @Date: 2025-06-12 10:23:39
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { PRIMARY_ROUTES, SECONDARY_ROUTES } from '@/constants';
import { usePathname } from '@/i18n/routing';
import { useMemo } from 'react';
import { useIsMobile } from './use-media-query';

export default function useIsFullPage() {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const isFullPage = useMemo(() => {
    return (
      isMobile &&
      [
        PRIMARY_ROUTES.WEIBO,
        PRIMARY_ROUTES.TWITTER,
        SECONDARY_ROUTES.STATUS_DETAIL,
        SECONDARY_ROUTES.TWEET_DETAIL,
      ].some(p => pathname.startsWith(p))
    );
  }, [isMobile, pathname]);

  return isFullPage;
}
