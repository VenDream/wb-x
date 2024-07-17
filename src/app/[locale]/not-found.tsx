/*
 * NotFound
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:28:42
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { CircleXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('global');

  return (
    <div className="flex max-h-full min-h-[10rem] flex-col items-center justify-center">
      <div className="flex items-center text-lg">
        <CircleXIcon size={24} className="mr-1" />
        {t('misc.notFound')} :(
      </div>
    </div>
  );
}
