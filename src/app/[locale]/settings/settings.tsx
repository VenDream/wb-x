'use client';

/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2024-04-07 15:16:26
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import AuthGuard from '@/components/common/auth-guard';
import MotionContainer from '@/components/common/motion-container';
import Tabs from '@/components/common/tabs';
import { CookieIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookiesSettings from './cookies';
import LocalSettings from './local';

type SettingsType = 'local' | 'cookies';

export default function Settings() {
  const t = useTranslations('pages.settings.tabs');
  const [activeTab, setActiveTab] = useState<SettingsType>('local');

  const isLocalActive = activeTab === 'local';
  const isCookiesActive = activeTab === 'cookies';

  return (
    <div className="w-full p-px lg:w-[800px] lg:pr-4">
      <Tabs
        size="sm"
        name="settings"
        className="border-base-content/10 border shadow-xs"
        items={[
          {
            label: t('local'),
            value: 'local' as SettingsType,
            icon: <SlidersHorizontalIcon size={16} />,
          },
          {
            label: t('cookies'),
            value: 'cookies' as SettingsType,
            icon: <CookieIcon size={16} />,
          },
        ]}
        value={activeTab}
        onChange={value => setActiveTab(value as SettingsType)}
      />
      <div className="bg-base-100 rounded-box border-base-content/10 mt-4 border shadow-xs">
        {isLocalActive && (
          <MotionContainer className="p-4">
            <LocalSettings />
          </MotionContainer>
        )}
        {isCookiesActive && (
          <AuthGuard>
            <CookiesSettings />
          </AuthGuard>
        )}
      </div>
    </div>
  );
}
