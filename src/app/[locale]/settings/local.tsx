/*
 * Local Settings
 *
 * @Author: VenDream
 * @Date: 2023-06-09 16:55:48
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Toggle } from '@/components/daisyui';
import { LS_KEYS } from '@/contants';
import { fadeInFromBottom } from '@/contants/motions';
import { DEFAULT_SETTINGS } from '@/utils/settings';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const settingsAtom = atomWithStorage<App.Settings>(
  LS_KEYS.SETTINGS,
  DEFAULT_SETTINGS
);

export default function LocalSettings() {
  const t1 = useTranslations('pages.settings.localSettings');
  const t2 = useTranslations('global.action');

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
    toast.success(t1('successTips'));
  };

  useEffect(() => {
    setSettings(lsSettings);
  }, [lsSettings]);

  return (
    <motion.div className="rounded-lg bg-base-200 p-4" {...fadeInFromBottom}>
      <div className="mb-8 flex flex-col gap-2 text-sm">
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
      <Button size="sm" color="primary" onClick={applySettings}>
        {t2('save')}
      </Button>
    </motion.div>
  );
}
