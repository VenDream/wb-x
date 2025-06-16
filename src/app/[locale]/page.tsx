/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { APP_NAME } from '@/constants';
import type { Metadata } from 'next';
import RefreshBtn from './refresh-btn';
import Stats from './stats';

// revalidate homepage requests at most every hour - 60 * 60
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Home | ${APP_NAME}`,
};

export default async function Page() {
  return (
    <MotionContainer className="space-y-4 p-px lg:pr-4">
      <Stats />
      <RefreshBtn />
    </MotionContainer>
  );
}
