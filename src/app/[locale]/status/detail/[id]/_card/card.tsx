'use client';

/*
 * Weibo Status Card
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:28:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

// import { cn } from '@/utils/classnames';
import { useMemo } from 'react';
import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardMenu from './card-menu';
import CardCtx, { DEFAULT_MENU } from './context';
import type { CardContext, CardProps } from './types';
import { card } from './variants';

import './card.css';

export default function Card(props: CardProps) {
  const { status, isRetweet, sourceStatusId, menu, renderCustomMenus } = props;

  const ctx = useMemo<CardContext>(
    () => ({
      status,
      menu: { ...DEFAULT_MENU, ...menu },
      isRetweet: !!isRetweet,
      sourceStatusId: isRetweet ? sourceStatusId : status.id,
      renderCustomMenus,
    }),
    [isRetweet, menu, renderCustomMenus, sourceStatusId, status]
  );

  return (
    <div
      data-status-id={status.id}
      className={card({ type: isRetweet ? 'retweet' : 'default' })}
    >
      <CardCtx.Provider value={ctx}>
        <CardHeader />
        <CardBody />
        <CardFooter />
        <CardMenu />
        {/* <div
          className={cn(
            'absolute left-0 top-0 z-50 flex h-full w-full items-center',
            'justify-center rounded-[inherit] bg-base-200/30 backdrop-blur-lg'
          )}
        >
          CARD - {status.id}
        </div> */}
      </CardCtx.Provider>
    </div>
  );
}
