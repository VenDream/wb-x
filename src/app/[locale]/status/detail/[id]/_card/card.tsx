'use client';

/*
 * Weibo Status Card
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:28:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useMemo } from 'react';
import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardMenu from './card-menu';
import CardCtx, { DEFAULT_MENU } from './context';
import type { CardContext, CardProps } from './types';
import { card } from './variants';

import './card.sass';

export default function Card(props: CardProps) {
  const { status, isRetweet, menu, renderCustomMenus } = props;

  const ctx = useMemo<CardContext>(
    () => ({
      status,
      isRetweet: !!isRetweet,
      menu: { ...DEFAULT_MENU, ...menu },
      renderCustomMenus,
    }),
    [isRetweet, menu, renderCustomMenus, status]
  );

  return (
    <div
      data-id={status.id}
      className={card({ type: isRetweet ? 'retweet' : 'default' })}
    >
      <CardCtx.Provider value={ctx}>
        <CardHeader />
        <CardBody />
        <CardFooter />
        <CardMenu />
        {/* <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-base-200">
          {status.id}
        </div> */}
      </CardCtx.Provider>
    </div>
  );
}
