/*
 * No Permission Tips
 *
 * @Author: VenDream
 * @Date: 2024-08-14 16:03:49
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { BanIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NoPermission() {
  const t = useTranslations('global.status');

  return (
    <MotionContainer className="p-4">
      <p className="flex items-center text-sm text-red-500">
        <BanIcon size={16} className="mr-2" />
        {t('noPermission')}
      </p>
    </MotionContainer>
  );
}
