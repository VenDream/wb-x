/*
 * No Data
 *
 * @Author: VenDream
 * @Date: 2023-11-20 17:34:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { NO_DATA } from '@/contants';
import { useTranslations } from 'next-intl';
import Image from '../image';

export default function NoData() {
  const t = useTranslations('global.dataFetching');

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={NO_DATA}
        alt="NO_DATA"
        width={30}
        placeholder={NO_DATA}
      ></Image>
      <p className="text-gray mt-2 text-sm">{t('noData')}</p>
    </div>
  );
}
