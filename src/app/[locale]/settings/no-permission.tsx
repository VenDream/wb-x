/*
 * No Permission Tips
 *
 * @Author: VenDream
 * @Date: 2024-08-14 16:03:49
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { cn } from '@/utils/classnames';
import { BanIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IProps {
  className?: string;
}

export default function NoPermission(props: IProps) {
  const t = useTranslations('global.status');

  return (
    <MotionContainer className={cn('p-4', props.className)}>
      <p className="flex items-center text-sm text-red-500">
        <BanIcon size={16} className="mr-2" />
        {t('noPermission')}
      </p>
    </MotionContainer>
  );
}
