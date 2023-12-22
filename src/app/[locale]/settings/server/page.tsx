'use client';

/*
 * Server Settings
 *
 * @Author: VenDream
 * @Date: 2023-12-22 15:23:17
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getSystemConfig, saveSystemConfig } from '@/api/client';
import CodeEditor from '@/components/common/code-editor';
import useDialog from '@/components/common/dialog';
import useToast from '@/components/common/toast';
import { Tab, Tabs } from '@/components/daisyui';
import { MAIN_ROUTES } from '@/contants';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const t1 = useTranslations('pages.settings.tabs');
  const t2 = useTranslations('pages.settings.serverSettings');

  const { showInfoTips, showSuccessTips, showErrorTips } = useToast();
  const { show: showDialog } = useDialog();
  const [config, setConfig] = useState('');

  const toLocalSettings = () => {
    router.push(MAIN_ROUTES.SETTINGS);
  };

  const confirm = (configStr: string) => {
    if (configStr === config) {
      showInfoTips(t2('nothingChanged'));
      return;
    }

    showDialog({
      status: 'confirm',
      title: t2('title'),
      body: t2('confirm'),
      onOk: () => saveConfig(configStr),
    });
  };

  const getConfig = useCallback(async () => {
    try {
      const config = await getSystemConfig();
      setConfig(config);
    } catch (err) {
      console.error(err);
      showErrorTips(t2('fetchFailed'));
    }
  }, [showErrorTips, t2]);

  const saveConfig = async (configStr: string) => {
    try {
      const { schedule } = await saveSystemConfig(configStr);
      setConfig(configStr);
      schedule && showSuccessTips(schedule);
    } catch (err) {
      console.error(err);
      showErrorTips((err as Error).message || t2('saveFailed'));
    }
  };

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  return (
    <div className="server-settings ">
      <Tabs value="server" boxed className="mb-4">
        <Tab value="local" onMouseDown={toLocalSettings}>
          {t1('local')}
        </Tab>
        <Tab value="server">{t1('server')}</Tab>
      </Tabs>
      {config ? (
        <div className="w-[50vw] min-w-[600px]">
          <CodeEditor
            title="config.yaml"
            code={config}
            lang="yaml"
            onSave={confirm}
          />
        </div>
      ) : null}
    </div>
  );
}
