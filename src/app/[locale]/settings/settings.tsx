'use client';

/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2024-04-07 15:16:26
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { Tab, Tabs } from '@/components/daisyui';
import useUser from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookiesSettings from './cookies';
import LocalSettings from './local';
import NoPermission from './no-permission';
import ServerSettings from './server';

type SettingsType = 'local' | 'server' | 'cookies';

const isClerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true';

export default function Settings() {
  const t = useTranslations('pages.settings.tabs');
  const { isAdmin } = useUser();

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
        {settingsType === 'server' &&
          (isAdmin ? <ServerSettings /> : <NoPermission />)}
        {settingsType === 'cookies' &&
          (isAdmin ? <CookiesSettings /> : <NoPermission />)}
      </div>
    </div>
  );
}
