/*
 * Local Settings
 *
 * @Author: VenDream
 * @Date: 2023-06-09 16:55:48
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Toggle } from '@/components/daisyui';
import { settingsAtom } from '@/store';
import { useAtom } from 'jotai';
import { SaveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function LocalSettings() {
  const t1 = useTranslations('pages.settings.local');
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
    <div className="space-y-8">
      <div className="flex flex-col gap-2 text-sm">
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
        <SaveIcon size={16} />
        {t2('save')}
      </Button>
    </div>
  );
}
