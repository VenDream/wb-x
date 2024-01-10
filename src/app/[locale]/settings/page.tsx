'use client';

/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2023-06-09 16:55:48
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import useToast from '@/components/common/toast/toast';
import { Button, Tab, Tabs, Toggle } from '@/components/daisyui';
import { LS_KEYS, SECONDARY_ROUTES } from '@/contants';
import { useRouter } from '@/navigation';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export interface LocalSettings {
  useImageProxy?: boolean;
  useVideoProxy?: boolean;
}

export const DEFAULT_SETTINGS: LocalSettings = {
  useImageProxy: false,
  useVideoProxy: true,
};

const settingsAtom = atomWithStorage<LocalSettings>(
  LS_KEYS.SETTINGS,
  DEFAULT_SETTINGS
);

export default function Page() {
  const router = useRouter();
  const t1 = useTranslations('pages.settings.tabs');
  const t2 = useTranslations('pages.settings.localSettings');
  const t3 = useTranslations('global.action');

  const { showSuccessTips } = useToast();
  const [lsSettings, setLsSettings] = useAtom(settingsAtom);
  const [settings, setSettings] = useState(lsSettings);

  const toServerSettings = () => {
    router.push(SECONDARY_ROUTES.SERVER_SETTINGS);
  };

  const updateSettings = (patch: Partial<LocalSettings>) => {
    setSettings(settings => ({
      ...settings,
      ...patch,
    }));
  };

  const applySettings = () => {
    setLsSettings(settings);
    showSuccessTips(t2('successTips'));
  };

  useEffect(() => {
    setSettings(lsSettings);
  }, [lsSettings]);

  return (
    <div className="local-settings">
      <Tabs value="local" boxed className="mb-4">
        <Tab value="local">{t1('local')}</Tab>
        <Tab value="server" onMouseDown={toServerSettings}>
          {t1('server')}
        </Tab>
      </Tabs>
      <div className="rounded bg-base-200 p-4">
        <div className="mb-8 flex flex-col gap-2 border-b border-base-content/10 pb-4 text-sm">
          <div className="flex w-60 items-center justify-between">
            <p>{t2('useImageProxy')}</p>
            <Toggle
              color="primary"
              checked={settings.useImageProxy}
              onChange={evt =>
                updateSettings({ useImageProxy: evt.target.checked })
              }
            />
          </div>
          <div className="flex w-60 items-center justify-between">
            <p>{t2('useVideoProxy')}</p>
            <Toggle
              color="primary"
              checked={settings.useVideoProxy}
              onChange={evt =>
                updateSettings({ useVideoProxy: evt.target.checked })
              }
            />
          </div>
        </div>
        <Button
          size="sm"
          color="primary"
          className="rounded"
          onClick={applySettings}
        >
          {t3('save')}
        </Button>
      </div>
    </div>
  );
}
