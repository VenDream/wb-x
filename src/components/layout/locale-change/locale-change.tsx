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
import {
  CheckCircleIcon,
  ChevronDownIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';
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
            <LanguageIcon />
            <span className="text-sm">{t('switcherLabel')}</span>
            <ChevronDownIcon />
          </Button>
        </DropdownToggle>
        <DropdownMenu className="z-10 mt-4 w-40 flex-nowrap gap-1 overflow-auto rounded-lg bg-base-300 shadow">
          {Object.entries(LANGS).map(([k, l]) => {
            const isSelected = l === locale;
            return (
              <DropdownItem key={k} anchor={false}>
                <Link locale={l} href={pathname} className="flex items-center">
                  <div className="flex w-2/3 items-center">
                    {isSelected ? (
                      <CheckCircleIcon className="mr-1" />
                    ) : (
                      <div className="mr-1 h-5 w-5"></div>
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
