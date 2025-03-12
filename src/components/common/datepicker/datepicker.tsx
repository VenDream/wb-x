'use client';

/*
 * DatePicker
 *
 * @Author: VenDream
 * @Date: 2024-9-6
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { useControllableValue, useMount } from 'ahooks';
import { XIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export interface DatePickerProps {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  panelClassName?: string;
}

const ANCHOR_NAME = '__CALLY__';
const CDN_URL = 'https://unpkg.com/cally';

let isCallyLoaded = false;

function loadCally(callback?: () => void) {
  if (isCallyLoaded) {
    callback?.();
    return;
  }

  const script = document.createElement('script');
  script.src = CDN_URL;
  script.type = 'module';
  script.async = true;
  script.dataset.role = 'cally';
  script.onload = () => {
    callback?.();
    isCallyLoaded = true;

    const scripts = document.querySelectorAll('[data-role="cally"]');
    scripts.forEach(s => {
      s.remove();
    });
  };
  document.head.appendChild(script);
}

export default function DatePicker(props: DatePickerProps) {
  const t = useTranslations('global.datepicker');
  const locale = useLocale();

  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useControllableValue<string | undefined>(props, {
    valuePropName: 'value',
    trigger: 'onChange',
  });

  const closePopover = () => {
    setIsOpen(false);
    const popover = document.getElementById(props.id);
    popover?.hidePopover();
  };

  useMount(() => {
    loadCally(() => setIsReady(true));
  });

  if (!isReady) return null;

  return (
    <div className={props.className}>
      <button
        type="button"
        className={cn(
          'input input-border h-full rounded-sm text-xs',
          'space-between relative flex items-center',
          {
            'text-base-content/50': !date,
          },
          props.inputClassName
        )}
        popoverTarget={props.id}
        // @ts-ignore
        style={{ anchorName: ANCHOR_NAME }}
        onClick={() => setIsOpen(true)}
      >
        {date || t('select')}
        {date && (
          <span
            className={cn(
              'btn btn-square btn-ghost size-6 fill-current p-1',
              'absolute right-1'
            )}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              setDate(undefined);
            }}
          >
            <XIcon />
          </span>
        )}
      </button>
      {isOpen && (
        <div
          className="bg-base-100/10 fixed inset-0 z-50 backdrop-blur-lg"
          onClick={closePopover}
        />
      )}
      <div
        popover=""
        id={props.id}
        className={cn('dropdown', props.panelClassName)}
        // @ts-ignore
        style={{ positionAnchor: ANCHOR_NAME }}
      >
        <calendar-date
          className="cally border-base-content/10 rounded-box bg-base-200/50 border"
          locale={locale}
          value={date}
          onchange={(e: any) => {
            setDate(e.target.value);
            closePopover();
          }}
        >
          <svg
            aria-label="Previous"
            className="size-4 fill-current"
            // @ts-ignore
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>Previous</title>
            <path d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <svg
            aria-label="Next"
            className="size-4 fill-current"
            // @ts-ignore
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>Next</title>
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <calendar-month />
        </calendar-date>
      </div>
    </div>
  );
}
