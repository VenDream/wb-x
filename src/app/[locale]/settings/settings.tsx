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
import { Tabs } from '@/components/daisyui/index2';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CookiesSettings from './cookies';
import LocalSettings from './local';

type SettingsType = 'local' | 'server' | 'cookies';

const { Tab, Content } = Tabs;

export default function Settings() {
  const t = useTranslations('pages.settings.tabs');
  const [activeTab, setActiveTab] = useState<SettingsType>('local');

  const isLocalActive = activeTab === 'local';
  const isCookiesActive = activeTab === 'cookies';

  return (
    <div className="w-[800px] pr-4">
      <Tabs size="sm" className="bg-base-200 rounded-box space-x-2 p-2">
        <Tab
          name="settings"
          label={t('local')}
          active={isLocalActive}
          onClick={() => setActiveTab('local')}
        />
        <Tab
          name="settings"
          label={t('cookies')}
          active={isCookiesActive}
          onClick={() => setActiveTab('cookies')}
        />
      </Tabs>

      <div className="bg-base-200 rounded-box mt-4">
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
