'use client';

/*
 * DatePicker
 *
 * @Author: VenDream
 * @Date: 2023-12-06 14:42:30
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Input } from '@/components/daisyui';
import { LANGS } from '@/contants';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import IDatePicker from 'tailwind-datepicker-react';
import type { IDatePickerProps } from 'tailwind-datepicker-react/types/Components/DatePicker';

import dayjs from 'dayjs';
import './datepicker.sass';

type DatePickerProps = Omit<IDatePickerProps, 'show' | 'setShow'>;

export default function DatePicker(props: DatePickerProps) {
  const t = useTranslations('global.datepicker');
  const locale = useLocale();

  const [show, setShow] = useState(false);

  const pickerProps: DatePickerProps = {
    ...props,
    options: {
      autoHide: true,
      todayBtn: true,
      todayBtnText: t('today'),
      clearBtn: true,
      clearBtnText: t('clear'),
      maxDate: new Date(),
      defaultDate: null,
      language: locale === LANGS.en ? 'en' : 'zh',
      inputPlaceholderProp: t('select'),
      datepickerClassNames: 'datepicker',
      theme: {
        ...props.options?.theme,
        background: 'bg-base-200 rounded border-regular-10 shadow',
        todayBtn: '',
        clearBtn: '',
        icons: '',
        text: '',
        disabledText: '!text-slate-500 pointer-events-none',
        input: '',
        inputIcon: '',
        selected: '',
      },
      ...props.options,
    },
  };

  return (
    <IDatePicker {...pickerProps} show={show} setShow={setShow}>
      <Input
        size="xs"
        placeholder={t('select')}
        className="h-[2rem] w-40 rounded"
        value={props.value ? dayjs(props.value).format('YYYY-MM-DD') : ''}
        onFocus={() => setShow(true)}
        readOnly
      />
    </IDatePicker>
  );
}
