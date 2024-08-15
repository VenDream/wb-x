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
import { getLocale } from '@/utils/common';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ServerSettings() {
  const t1 = useTranslations('pages.settings.server');
  const t2 = useTranslations('global.status');

  const { show: showDialog } = useDialog();
  const [config, setConfig] = useState('');

  const confirm = (configStr: string) => {
    if (configStr === config) {
      toast.info(t1('nothingChanged'));
      return;
    }

    showDialog({
      status: 'caution',
      title: t2('caution'),
      body: t1('confirm'),
      onOk: () => saveConfig(configStr),
    });
  };

  const getConfig = useCallback(async () => {
    try {
      const config = await getSystemConfig();
      setConfig(config);
    } catch (err) {
      console.error(err);
      toast.error(t1('fetchFailed'));
    }
  }, [t1]);

  const saveConfig = async (configStr: string) => {
    try {
      const locale = getLocale();
      const { schedule } = await saveSystemConfig(configStr, locale);
      setConfig(configStr);
      schedule && toast.success(schedule);
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || t1('saveFailed'));
    }
  };

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  return config ? (
    <CodeEditor
      title="config.yaml"
      code={config}
      lang="yaml"
      onSave={confirm}
    />
  ) : null;
}
