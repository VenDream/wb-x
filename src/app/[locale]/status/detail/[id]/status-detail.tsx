'use client';

/*
 * Status Detail
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:19:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/client';
import { CommentList, StatusCard } from '@/app/[locale]/status/_card';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { NoData } from '@/components/common/no-data';
import { DEFAULT_FAV_UID } from '@/constants';
import useUser from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

interface IProps {
  id: string;
}

export default function StatusDetail(props: IProps) {
  const t = useTranslations('pages.status');
  const { user } = useUser();
  const uid = user?.id || DEFAULT_FAV_UID;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Weibo.Status | null>(null);

  const fetchStatusDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const statuses = await weibo.getStatusList({ id: props.id, favUid: uid });
      if (statuses.list.length > 0) {
        setStatus(statuses.list[0]);
      }

      /** @TODO try fetching from upstream */
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [props.id, uid]);

  useEffect(() => {
    fetchStatusDetail();
  }, [fetchStatusDetail]);

  return isLoading ? (
    <Loading align="center" />
  ) : (
    <MotionContainer className="flex flex-col items-center">
      {status ? (
        <>
          <StatusCard status={status} menu={{ viewComments: false }} />
          <CommentList id={props.id} />
        </>
      ) : (
        <NoData tips={t('notExists')} />
      )}
    </MotionContainer>
  );
}
