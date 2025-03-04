'use client';

/*
 * Locale Switcher
 *
 * @Author: VenDream
 * @Date: 2023-08-29 17:33:39
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '@/components/daisyui';
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
    <Dropdown end>
      <DropdownToggle button={false}>
        <Button color="ghost">
          <LanguagesIcon size={18} />
          <span className="text-sm">{t('switcherLabel')}</span>
          <ChevronDownIcon size={18} />
        </Button>
      </DropdownToggle>
      <DropdownMenu
        className={cn(
          'z-10 mt-4 w-44 flex-nowrap gap-1 overflow-auto rounded-[--rounded-box]',
          'border border-base-content/10 bg-base-100/50 shadow backdrop-blur'
        )}
      >
        {Object.entries(LANGS).map(([k, l]) => {
          const isSelected = l === locale;
          return (
            <DropdownItem key={k} anchor={false}>
              <Link
                locale={l}
                href={pathname + (searchParams ? `?${searchParams}` : '')}
                className="flex items-center gap-4"
              >
                <div className="flex items-center">
                  {isSelected ? (
                    <CircleCheckBigIcon size={16} className="mr-2" />
                  ) : (
                    <div className="mr-2 h-4 w-4" />
                  )}
                  {l}
                </div>
                <div className="h-7 w-7">
                  {l === LANGS.en ? EN_FLAG : ZH_FLAG}
                </div>
              </Link>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
