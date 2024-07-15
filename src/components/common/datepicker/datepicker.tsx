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
import { useMemoizedFn } from 'ahooks';
import dayjs from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import IDatePicker from 'tailwind-datepicker-react';
import type { IDatePickerProps } from 'tailwind-datepicker-react/types/Components/DatePicker';

import './datepicker.sass';

type DatePickerProps = Omit<IDatePickerProps, 'show' | 'setShow'>;

const DATEPICKER = 'wbx-datepicker';

export default function DatePicker(props: DatePickerProps) {
  const t = useTranslations('global.datepicker');
  const locale = useLocale();
  const isEn = locale === LANGS.en;

  const [show, setShow] = useState(false);

  const pickerProps: DatePickerProps = {
    ...props,
    options: {
      autoHide: true,
      todayBtn: true,
      todayBtnText: t('today'),
      clearBtn: true,
      clearBtnText: t('clear'),
      defaultDate: null,
      language: isEn ? 'en' : 'zh',
      inputPlaceholderProp: t('select'),
      datepickerClassNames: DATEPICKER,
      weekDays: t('weekDays').split(','),
      theme: {
        ...props.options?.theme,
        background: '!bg-base-100 border border-base-content/10 shadow',
        todayBtn: '!btn-primary',
        clearBtn: '',
        icons: '',
        text: '',
        disabledText: '',
        input: '',
        inputIcon: '',
        selected: '!btn-primary',
      },
      ...props.options,
    },
  };

  const checkClickOutside = useMemoizedFn((evt: MouseEvent) => {
    if (!show) return;
    const target = evt.target as HTMLElement;
    if (!target.closest(`.${DATEPICKER}`)) {
      setShow(false);
    }
  });

  useEffect(() => {
    document.addEventListener('mousedown', checkClickOutside);
    return () => {
      document.removeEventListener('mousedown', checkClickOutside);
    };
  }, [checkClickOutside]);

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
