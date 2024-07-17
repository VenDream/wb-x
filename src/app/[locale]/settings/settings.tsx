'use client';

/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2024-04-07 15:16:26
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Tab, Tabs } from '@/components/daisyui';
import { useUser } from '@clerk/nextjs';
import { BanIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LocalSettings from './local';
import ServerSettings from './server';

type SettingsType = 'local' | 'server';

export default function Settings() {
  const t1 = useTranslations('pages.settings.tabs');
  const t2 = useTranslations('global.status');

  const { user } = useUser();
  const isOrgAdmin = user?.organizationMemberships?.some(
    org => org.role === 'org:admin'
  );

  const [settingsType, setSettingsType] = useState<SettingsType>('local');

  return (
    <div className="w-[800px] space-y-4 pr-4">
      <Tabs boxed value={settingsType} onChange={setSettingsType}>
        <Tab value="local">{t1('local')}</Tab>
        <Tab value="server">{t1('server')}</Tab>
      </Tabs>
      <div className="settings-content">
        {settingsType === 'local' && <LocalSettings />}
        {settingsType === 'server' &&
          (isOrgAdmin ? (
            <ServerSettings />
          ) : (
            <div className="rounded-lg bg-base-200 p-4">
              <p className="flex items-center text-sm">
                <BanIcon size={16} className="mr-2" />
                {t2('noPermission')}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
