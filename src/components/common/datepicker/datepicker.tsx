'use client';

/*
 * DatePicker
 *
 * @Author: VenDream
 * @Date: 2025-3-18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/constants';
import { cn } from '@/utils/classnames';
import { useControllableValue } from 'ahooks';
import dayjs from 'dayjs';
import { XIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { type CustomComponents, DayPicker } from 'react-day-picker';
import { enUS, zhCN } from 'react-day-picker/locale';
import Select from '../select';

import 'react-day-picker/style.css';
import './datepicker.css';

type DropdownProps = Parameters<CustomComponents['Dropdown']>[0];

export interface DatePickerProps {
  name: string;

  date?: string;
  onChange?: (date: string) => void;

  className?: string;
  inputClassName?: string;
  panelClassName?: string;
}

export default function DatePicker(props: DatePickerProps) {
  const t = useTranslations('global.datepicker');
  const locale = useLocale();

  const [date, setDate] = useControllableValue<string>(props, {
    defaultValue: undefined,
    valuePropName: 'date',
    trigger: 'onChange',
  });

  const id = props.name;
  const anchorName = `--${id}`;

  const Dropdown = useCallback((props: DropdownProps) => {
    const { options, value, onChange } = props;

    const selectOptions =
      options?.map(option => ({
        label: option.label,
        value: option.value as unknown as string,
      })) || [];

    return (
      <Select
        options={selectOptions.reverse()}
        value={value as string}
        onChange={value => {
          const evt: Record<string, any> = {};
          evt.target = { value };
          onChange?.(evt as any);
        }}
        inputClassName="bg-base-300 rounded-sm font-normal"
        menuClassName={cn(
          'h-[200px] w-[170px] rounded-sm font-normal border',
          'bg-base-300 border-base-content/10'
        )}
      />
    );
  }, []);

  return (
    <div className={props.className}>
      <button
        type="button"
        className={cn(
          'input flex h-full items-center justify-between',
          {
            'text-base-content/50': !date,
          },
          props.inputClassName
        )}
        popoverTarget={id}
        style={{ anchorName } as React.CSSProperties}
      >
        {date || t('select')}
        {date && (
          <XIcon
            size={16}
            className="cursor-pointer"
            onClick={e => {
              setDate('');
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        )}
      </button>
      <div
        id={id}
        popover="auto"
        className={cn('dropdown rdp-popover', props.panelClassName)}
        style={{ positionAnchor: anchorName } as React.CSSProperties}
      >
        <DayPicker
          mode="single"
          hideNavigation
          captionLayout="dropdown"
          components={{ Dropdown }}
          className="react-day-picker"
          selected={date ? dayjs(date).toDate() : undefined}
          locale={locale === LANGS.zh ? zhCN : enUS}
          onSelect={date => {
            setDate(dayjs(date).format('YYYY-MM-DD'));
            const popup = document.getElementById(id);
            popup?.hidePopover();
          }}
        />
      </div>
    </div>
  );
}
