'use client';

/*
 * Edit Config
 *
 * @Author: VenDream
 * @Date: 2023-08-25 11:18:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getSystemConfig, saveSystemConfig } from '@/api/client';
import CodeEditor from '@/components/common/code-editor';
import useDialog from '@/components/common/dialog';
import useToast from '@/components/common/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

export default function EditConfig() {
  const t = useTranslations('pages.settings.sysConfig');
  const { showInfoTips, showSuccessTips, showErrorTips } = useToast();
  const { show: showDialog } = useDialog();
  const [config, setConfig] = useState('');

  const confirm = (configStr: string) => {
    if (configStr === config) {
      showInfoTips(t('nothingChanged'));
      return;
    }

    showDialog({
      status: 'confirm',
      title: t('title'),
      body: t('confirm'),
      onOk: () => saveConfig(configStr),
    });
  };

  const getConfig = useCallback(async () => {
    try {
      const config = await getSystemConfig();
      setConfig(config);
    } catch (err) {
      console.error(err);
      showErrorTips(t('fetchFailed'));
    }
  }, [showErrorTips, t]);

  const saveConfig = async (configStr: string) => {
    try {
      const { schedule } = await saveSystemConfig(configStr);
      setConfig(configStr);
      schedule && showSuccessTips(schedule);
    } catch (err) {
      console.error(err);
      showErrorTips((err as Error).message || t('saveFailed'));
    }
  };

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  return (
    <div className="edit-config w-[50vw] min-w-[600px]">
      {config ? (
        <CodeEditor
          title="config.yaml"
          code={config}
          lang="yaml"
          onSave={confirm}
        ></CodeEditor>
      ) : null}
    </div>
  );
}
