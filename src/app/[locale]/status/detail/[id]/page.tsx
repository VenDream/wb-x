/*
 * Weibo Status Detail
 *
 * @Author: VenDream
 * @Date: 2023-11-23 11:42:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbRetweetStatusDetail, getDbStatusDetail } from '@/api/server';
import MotionContainer from '@/components/common/motion-container';
import NoData from '@/components/common/no-data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StatusCard from './_card';
import CommentList from './_card/comment-list';

export const metadata: Metadata = {
  title: 'Status Detail',
};

export default async function Page({ params }: ParamsBody) {
  const { id } = params;
  let status: Backend.Status;

  const t = await getTranslations('global.dataFetching');

  // try status first
  status = await getDbStatusDetail(id);
  // if not found, try retweet status
  if (!status) {
    status = await getDbRetweetStatusDetail(id);
  }

  return (
    <MotionContainer className="flex flex-col items-center">
      {status ? (
        <>
          <StatusCard status={status} menu={{ viewComments: false }} />
          <CommentList id={id} />
        </>
      ) : (
        <div className="p-4">
          <NoData tips={t('noMatchedData')} />
        </div>
      )}
    </MotionContainer>
  );
}
