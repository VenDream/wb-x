'use client';

/*
 * Locale Switcher
 *
 * @Author: VenDream
 * @Date: 2023-08-29 17:33:39
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Dropdown } from '@/components/daisyui/index2';
import { LANGS } from '@/constants';
import { EN_FLAG, ZH_FLAG } from '@/constants/svgs';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import {
  ChevronDownIcon,
  CircleCheckBigIcon,
  LanguagesIcon,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function LocaleChange() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const t = useTranslations('global.locale');

  return (
    <Dropdown align="end">
      <Dropdown.Toggle>
        <Button ghost>
          <LanguagesIcon size={18} />
          <span className="text-sm">{t('switcherLabel')}</span>
          <ChevronDownIcon size={18} />
        </Button>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={cn(
          'z-10 mt-4 w-44 flex-nowrap gap-1 overflow-auto',
          'bg-base-100/50 border-base-content/10 border backdrop-blur-lg'
        )}
      >
        {Object.entries(LANGS).map(([k, l]) => {
          const isSelected = l === locale;
          return (
            <Dropdown.Item key={k}>
              <Link
                locale={l}
                className="flex items-center gap-3"
                href={pathname + (searchParams ? `?${searchParams}` : '')}
              >
                {isSelected ? (
                  <CircleCheckBigIcon size={16} />
                ) : (
                  <div className="h-4 w-4" />
                )}
                {l}
                <div className="h-7 w-7">
                  {l === LANGS.en ? EN_FLAG : ZH_FLAG}
                </div>
              </Link>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
