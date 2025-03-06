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
import useUser from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookiesSettings from './cookies';
import LocalSettings from './local';

type SettingsType = 'local' | 'server' | 'cookies';

export default function Settings() {
  const { isAdmin } = useUser();
  const t = useTranslations('pages.settings.tabs');
  const [settingsType, setSettingsType] = useState<SettingsType>('local');

  const EmptyTab = (props: { value: string }) => (
    <Tab className="hidden" value={props.value} />
  );

  return (
    <div className="w-[800px] space-y-4 pr-4">
      <Tabs
        boxed
        value={settingsType}
        onChange={setSettingsType}
        className="h-12 items-center bg-base-200 p-2"
      >
        <Tab value="local">{t('local')}</Tab>
        {isAdmin ? (
          <Tab value="cookies">{t('cookies')}</Tab>
        ) : (
          <EmptyTab value="2" />
        )}
      </Tabs>
      <div className="rounded-[--rounded-box] bg-base-200">
        {settingsType === 'local' && (
          <MotionContainer className="p-4">
            <LocalSettings />
          </MotionContainer>
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
