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
import { Tab, Tabs } from '@/components/daisyui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookiesSettings from './cookies';
import LocalSettings from './local';
import ServerSettings from './server';

type SettingsType = 'local' | 'server' | 'cookies';

export default function Settings() {
  const t = useTranslations('pages.settings.tabs');
  const [settingsType, setSettingsType] = useState<SettingsType>('local');

  return (
    <div className="w-[800px] space-y-4 pr-4">
      <Tabs boxed value={settingsType} onChange={setSettingsType}>
        <Tab value="local">{t('local')}</Tab>
        <Tab value="server">{t('server')}</Tab>
        <Tab value="cookies">{t('cookies')}</Tab>
      </Tabs>
      <div className="rounded-[--rounded-box] bg-base-200">
        {settingsType === 'local' && (
          <MotionContainer className="p-4">
            <LocalSettings />
          </MotionContainer>
        )}
        {settingsType === 'server' && (
          <AuthGuard>
            <ServerSettings />
          </AuthGuard>
        )}
        {settingsType === 'cookies' && (
          <AuthGuard>
            <CookiesSettings />
          </AuthGuard>
        )}
      </div>
    </div>
  );
}
