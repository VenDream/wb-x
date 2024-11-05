/*
 * Status Detail Page
 *
 * @Author: VenDream
 * @Date: 2023-11-23 11:42:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbRetweetStatusDetail, getDbStatusDetail } from '@/api/server';
import MotionContainer from '@/components/common/motion-container';
import { NoData } from '@/components/common/no-data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StatusDetail from './status-detail';

export const metadata: Metadata = {
  title: 'Status Detail',
};

export default async function Page({ params }: ParamsBody) {
  const { id } = await params;
  const t = await getTranslations('global.dataFetching');

  let status: Backend.Status;

  // try status first
  status = await getDbStatusDetail(id);
  // if not found, try retweet status
  if (!status) {
    status = await getDbRetweetStatusDetail(id);
  }

  return (
    <MotionContainer className="flex flex-col items-center">
      {status ? (
        <StatusDetail id={id} status={status} />
      ) : (
        <div className="p-4">
          <NoData tips={t('noMatchingData')} />
        </div>
      )}
    </MotionContainer>
  );
}
