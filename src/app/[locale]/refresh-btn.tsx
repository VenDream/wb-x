'use client';

/*
 * Refresh Btn
 *
 * @Author: VenDream
 * @Date: 2024-11-06 14:38:50
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { refreshDbInfo } from '@/app/actions';
import AuthGuard from '@/components/common/auth-guard';
import RouterRefresh from '@/components/common/router-refresh';
import { Button } from '@/components/daisyui';
import { useIsMobile } from '@/hooks/use-media-query';
import { cn } from '@/utils/classnames';
import { RefreshCcwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function RefreshBtn() {
  const t = useTranslations('global.action');
  const isMobile = useIsMobile();

  return (
    <AuthGuard fallback={null} loading={false}>
      <RouterRefresh action={refreshDbInfo} className={cn({ block: isMobile })}>
        <Button color="primary" size="sm" autoBlockOnMobile>
          <RefreshCcwIcon size={16} />
          {t('refresh')}
        </Button>
      </RouterRefresh>
    </AuthGuard>
  );
}
