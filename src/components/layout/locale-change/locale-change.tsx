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
import { LANGS } from '@/contants';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/utils/classnames';
import {
  ChevronDownIcon,
  CircleCheckBigIcon,
  LanguagesIcon,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const Flags: Record<keyof typeof LANGS, string> = {
  en: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg',
  zh: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e8-1f1f3.svg',
};

export default function LocaleChange() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('global.locale');

  return (
    <div className="locale-change">
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
            'z-10 mt-4 w-40 flex-nowrap gap-1 overflow-auto rounded-[--rounded-box]',
            'border border-base-content/10 bg-base-100 shadow'
          )}
        >
          {Object.entries(LANGS).map(([k, l]) => {
            const isSelected = l === locale;
            return (
              <DropdownItem key={k} anchor={false}>
                <Link
                  locale={l}
                  href={pathname}
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
                  <Image
                    alt="FLAG"
                    width={30}
                    height={22}
                    src={Flags[k as keyof typeof LANGS]}
                  />
                </Link>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
