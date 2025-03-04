/*
 * DatePicker
 *
 * @Author: VenDream
 * @Date: 2024-9-6
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/constants';
import { cn } from '@/utils/classnames';
import dayjs from '@/utils/dayjs';
import ReactDatePicker, {
  type DatepickerType,
} from '@tarabao/react-tailwindcss-datepicker';
import { useLocale, useTranslations } from 'next-intl';

import './datepicker.sass';

const FIRST_DAY = '01-01';
const LAST_DAY = '12-31';
const THIS_YEAR = dayjs().year();
const LAST_YEAR = dayjs().subtract(1, 'year').year();

export default function DatePicker(props: DatepickerType) {
  const t = useTranslations('global.datepicker');
  const locale = useLocale();

  return (
    <ReactDatePicker
      readOnly
      showShortcuts
      placeholder={t('select')}
      i18n={locale === LANGS.en ? 'en' : 'zh'}
      configs={{
        shortcuts: {
          yesterday: t('yesterday'),
          today: t('today'),
          firstDayOfLastYear: {
            text: t('firstDayOfLastYear'),
            period: {
              start: new Date(`${LAST_YEAR}-${FIRST_DAY}`),
              end: new Date(`${LAST_YEAR}-${FIRST_DAY}`),
            },
          },
          lastDayOfLastYear: {
            text: t('lastDayOfLastYear'),
            period: {
              start: new Date(`${LAST_YEAR}-${LAST_DAY}`),
              end: new Date(`${LAST_YEAR}-${LAST_DAY}`),
            },
          },
          firstDayOfYear: {
            text: t('firstDayOfYear'),
            period: {
              start: new Date(`${THIS_YEAR}-${FIRST_DAY}`),
              end: new Date(`${THIS_YEAR}-${FIRST_DAY}`),
            },
          },
          lastDayOfYear: {
            text: t('lastDayOfYear'),
            period: {
              start: new Date(`${THIS_YEAR}-${LAST_DAY}`),
              end: new Date(`${THIS_YEAR}-${LAST_DAY}`),
            },
          },
        },
      }}
      {...props}
      containerClassName={cn(
        'wbx-datepicker relative',
        props.containerClassName
      )}
      inputClassName={cn(
        'w-full h-full rounded input input-bordered focus:outline-offset-0',
        props.inputClassName
      )}
    />
  );
}

export type * from 'react-tailwindcss-datepicker';
