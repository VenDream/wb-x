/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { refreshDbInfo } from '@/app/actions';
import MotionContainer from '@/components/common/motion-container';
import RouterRefresh from '@/components/common/router-refresh';
import { Button } from '@/components/daisyui';
import { APP_NAME } from '@/contants';
import { DatabaseIcon, RefreshCcwIcon } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Stats from './stats';

// revalidate homepage requests at most every hour - 60 * 60
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Home | ${APP_NAME}`,
};

export default async function Page({ params }: ParamsBody) {
  unstable_setRequestLocale(params.locale);

  const t1 = await getTranslations('global');
  const t2 = await getTranslations('pages.home');

  return (
    <MotionContainer className="space-y-4 pr-4">
      <h1 className="flex items-center text-2xl">
        <DatabaseIcon size={24} className="mr-2" />
        {t2('title')}
      </h1>
      <Stats />
      <RouterRefresh action={refreshDbInfo}>
        <Button color="primary" size="sm">
          <RefreshCcwIcon size={16} />
          {t1('action.refresh')}
        </Button>
      </RouterRefresh>
    </MotionContainer>
  );
}
