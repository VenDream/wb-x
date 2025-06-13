'use client';

/*
 * DatePicker
 *
 * @Author: VenDream
 * @Date: 2025-3-18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Dialog, type DialogProps } from '@/components/common/dialog';
import Select from '@/components/common/select';
import { Button, Collapse } from '@/components/daisyui';
import { LANGS } from '@/constants';
import { cn } from '@/utils/classnames';
import { useControllableValue } from 'ahooks';
import dayjs from 'dayjs';
import { CalendarIcon, XIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { type CustomComponents, DayPicker } from 'react-day-picker';
import { enUS, zhCN } from 'react-day-picker/locale';

import 'react-day-picker/style.css';
import './datepicker.css';

type DropdownProps = Parameters<CustomComponents['Dropdown']>[0];

export interface DatePickerProps {
  date?: string;
  onChange?: (date: string) => void;

  className?: string;
  inputClassName?: string;
  dialogClassNames?: DialogProps['classNames'];
}

const TODAY = dayjs();
const THIS_YEAR = TODAY.year();
const LAST_YEAR = THIS_YEAR - 1;

const YESTERDAY = TODAY.subtract(1, 'day');
const FIRST_DAY_OF_YEAR = dayjs(`${THIS_YEAR}-01-01`);
const LAST_DAY_OF_YEAR = dayjs(`${THIS_YEAR}-12-31`);
const FIRST_DAY_OF_LAST_YEAR = dayjs(`${LAST_YEAR}-01-01`);
const LAST_DAY_OF_LAST_YEAR = dayjs(`${LAST_YEAR}-12-31`);

export default function DatePicker(props: DatePickerProps) {
  const t = useTranslations('global.datepicker');
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useControllableValue<string>(props, {
    defaultValue: undefined,
    valuePropName: 'date',
    trigger: 'onChange',
  });

  const pickedDate = useMemo(() => {
    return date ? dayjs(date).toDate() : undefined;
  }, [date]);

  const quickSelectDays = useMemo(() => {
    return [
      {
        label: t('yesterday'),
        value: YESTERDAY,
      },
      {
        label: t('today'),
        value: TODAY,
      },
      {
        label: t('firstDayOfYear'),
        value: FIRST_DAY_OF_YEAR,
      },
      {
        label: t('lastDayOfYear'),
        value: LAST_DAY_OF_YEAR,
      },
      {
        label: t('firstDayOfLastYear'),
        value: FIRST_DAY_OF_LAST_YEAR,
      },
      {
        label: t('lastDayOfLastYear'),
        value: LAST_DAY_OF_LAST_YEAR,
      },
    ];
  }, [t]);

  const Dropdown = useCallback((props: DropdownProps) => {
    const { options = [], value, onChange } = props;

    const isMonth = options.length === 12;
    const selectOptions = options.map(option => ({
      label: option.label,
      value: option.value.toString(),
    }));

    const onSelected = (value: string) => {
      const evt: Record<string, any> = {};
      evt.target = { value: +value };
      onChange?.(evt as any);
    };

    return (
      <Select
        options={isMonth ? selectOptions : selectOptions.reverse()}
        value={value?.toString()}
        onChange={onSelected}
        inputClassName="font-normal bg-transparent"
        menuClassName={cn(
          'h-[200px] w-[203px] rounded-sm font-normal backdrop-blur-lg',
          'bg-base-100/50 '
        )}
      />
    );
  }, []);

  const quickSelect = (date: dayjs.Dayjs) => {
    setDate(date.format('YYYY-MM-DD'));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      footer={null}
      classNames={props.dialogClassNames}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'input flex items-center justify-between',
            {
              'text-base-content/50': !date,
            },
            props.inputClassName
          )}
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
      </Dialog.Trigger>
      <Dialog.Title>
        <CalendarIcon size={18} className="mr-2" />
        {t('select')}
      </Dialog.Title>
      <Dialog.Content>
        <DayPicker
          mode="single"
          hideNavigation
          defaultMonth={pickedDate}
          captionLayout="dropdown"
          components={{ Dropdown }}
          className={cn('react-day-picker', props.className)}
          locale={locale === LANGS.zh ? zhCN : enUS}
          selected={pickedDate}
          onSelect={date => {
            setDate(dayjs(date).format('YYYY-MM-DD'));
            setOpen(false);
          }}
        />
      </Dialog.Content>
      <Dialog.Footer className="p-2">
        <Collapse
          arrow
          inputClassName="!h-8 !min-h-8"
          className={cn('border-base-content/10 border-1 p-2', 'rounded-field')}
        >
          <Collapse.Title
            className={cn(
              'flex h-8 min-h-8 items-center text-sm',
              'after:!top-[calc(50%_+_4px)] after:!translate-y-[-50%]'
            )}
          >
            {t('quickSelect')}
          </Collapse.Title>
          <Collapse.Content
            className={cn('grid grid-cols-2 gap-2', 'peer-checked:pt-2')}
          >
            {quickSelectDays.map(item => (
              <Button
                key={item.value.toString()}
                size="sm"
                onClick={() => quickSelect(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </Collapse.Content>
        </Collapse>
      </Dialog.Footer>
    </Dialog>
  );
}
