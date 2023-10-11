/*
 * NotFound
 *
 * @Author: VenDream
 * @Date: 2023-09-07 17:28:42
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { XCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('global');

  return (
    <div className="flex max-h-full min-h-[10rem] flex-col items-center justify-center">
      <div className="flex items-center text-lg">
        <XCircleIcon className="mr-1 h-6 w-6" />
        {t('misc.notFound')} :(
      </div>
    </div>
  );
}
