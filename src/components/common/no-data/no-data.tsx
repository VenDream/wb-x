/*
 * No Data
 *
 * @Author: VenDream
 * @Date: 2023-11-20 17:34:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { BracketsIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NoData() {
  const t = useTranslations('global.dataFetching');

  return (
    <p className="flex items-center text-sm text-base-content/50">
      <BracketsIcon size={16} className="mr-2" />
      {t('noData')}
    </p>
  );
}
