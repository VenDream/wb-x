'use client';

/*
 * Weibo Status Card
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:28:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import merge from 'lodash.merge';
import { useCallback, useMemo, useState } from 'react';
import CardBody from './card-body';
import CardFooter from './card-footer';
import CardHeader from './card-header';
import CardMenu from './card-menu';
import CardCtx, { DEFAULT_MENU } from './context';
import type { CardContext, CardProps } from './types';
import { card } from './variants';

import './card.css';

export default function Card(props: CardProps) {
  const { isRetweet, sourceStatusId, menu } = props;

  const [status, setStatus] = useState<Weibo.Status>(props.status);

  const updateStatus = useCallback((status: Partial<Weibo.Status>) => {
    setStatus(prev => merge({}, prev, status));
  }, []);

  const ctx = useMemo<CardContext>(
    () => ({
      status,
      updateStatus,
      menu: { ...DEFAULT_MENU, ...menu },
      isRetweet: !!isRetweet,
      sourceStatusId: isRetweet ? sourceStatusId : status.id,
    }),
    [isRetweet, menu, sourceStatusId, status, updateStatus]
  );

  return (
    <div
      data-status-id={status.id}
      className={card({ type: isRetweet ? 'retweet' : 'source' })}
    >
      <CardCtx.Provider value={ctx}>
        <CardHeader />
        <CardBody />
        <CardFooter />
        <CardMenu />
      </CardCtx.Provider>
    </div>
  );
}
