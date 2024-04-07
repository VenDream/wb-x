/*
 * Local Settings
 *
 * @Author: VenDream
 * @Date: 2023-06-09 16:55:48
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import useToast from '@/components/common/toast/toast';
import { Button, Toggle } from '@/components/daisyui';
import { LS_KEYS } from '@/contants';
import { DEFAULT_SETTINGS } from '@/utils/settings';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const settingsAtom = atomWithStorage<App.Settings>(
  LS_KEYS.SETTINGS,
  DEFAULT_SETTINGS
);

export default function LocalSettings() {
  const t1 = useTranslations('pages.settings.localSettings');
  const t2 = useTranslations('global.action');

  const { showSuccessTips } = useToast();
  const [lsSettings, setLsSettings] = useAtom(settingsAtom);
  const [settings, setSettings] = useState(lsSettings);

  const updateSettings = (patch: Partial<App.Settings>) => {
    setSettings(settings => ({
      ...settings,
      ...patch,
    }));
  };

  const applySettings = () => {
    setLsSettings(settings);
    showSuccessTips(t1('successTips'));
  };

  useEffect(() => {
    setSettings(lsSettings);
  }, [lsSettings]);

  return (
    <div className="rounded bg-base-200 p-4">
      <div className="mb-8 flex flex-col gap-2 border-b border-base-content/10 pb-4 text-sm">
        <div className="flex w-60 items-center justify-between">
          <p>{t1('useImageProxy')}</p>
          <Toggle
            color="primary"
            checked={settings.useImageProxy}
            onChange={evt =>
              updateSettings({ useImageProxy: evt.target.checked })
            }
          />
        </div>
        <div className="flex w-60 items-center justify-between">
          <p>{t1('useVideoProxy')}</p>
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
        {t2('save')}
      </Button>
    </div>
  );
}
