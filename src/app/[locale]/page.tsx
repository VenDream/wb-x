/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { APP_NAME } from '@/contants';
import { DatabaseIcon } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RefreshBtn from './refresh-btn';
import Stats from './stats';

// revalidate homepage requests at most every hour - 60 * 60
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Home | ${APP_NAME}`,
};

export default async function Page() {
  const t = await getTranslations('pages.home');

  return (
    <MotionContainer className="space-y-4 pr-4">
      <h1 className="flex items-center text-2xl">
        <DatabaseIcon size={24} className="mr-2" />
        {t('title')}
      </h1>
      <Stats />
      <RefreshBtn />
    </MotionContainer>
  );
}
