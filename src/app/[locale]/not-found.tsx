/*
 * NotFound
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:28:42
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { cn } from '@/utils/classnames';
import { CircleXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('global');

  return (
    <MotionContainer
      className={cn('rounded-[--rounded-box] bg-base-200 p-4', 'max-w-7xl')}
    >
      <p className="flex items-center text-error">
        <CircleXIcon size={20} className="mr-1" />
        {t('misc.notFound')} :(
      </p>
    </MotionContainer>
  );
}
