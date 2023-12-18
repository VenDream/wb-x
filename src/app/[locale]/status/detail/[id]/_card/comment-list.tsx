'use client';

/*
 * Weibo Status Comment List
 *
 * @Author: VenDream
 * @Date: 2023-12-11 10:25:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getStatusComments } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import useToast from '@/components/common/toast';
import { Tab, Tabs } from '@/components/daisyui';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommentItem from './comment-item';
import type { CommentListProps } from './types';

export default function CommentList(props: CommentListProps) {
  const { showErrorTips } = useToast();
  const t = useTranslations('pages.status.comments');

  const maxIdRef = useRef('');
  const listRef = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState<Backend.StatusCommentOrderBy>('hot');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [commentList, setCommentList] = useState<Backend.StatusComment[]>([]);

  const fetchCommentList = useCallback(async () => {
    try {
      setIsLoading(true);
      const maxId = maxIdRef.current || '';
      const resp = await getStatusComments({
        id: props.id,
        maxId,
        orderBy,
      });
      if (maxId === '') {
        setCommentList(resp.comments);
      } else {
        setCommentList(list => [...list, ...resp.comments]);
      }

      setTotal(resp.total);
      if (resp.maxId === '0') setIsLoadAll(true);
      if (maxIdRef.current === '' && location.hash === '#comments') {
        setTimeout(() => {
          listRef.current?.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          });
        });
      }

      maxIdRef.current = resp.maxId;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, props.id, showErrorTips]);

  const switchOrderBy = useCallback((orderBy: Backend.StatusCommentOrderBy) => {
    maxIdRef.current = '';
    setIsLoadAll(false);
    setOrderBy(orderBy);
  }, []);

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  return (
    <div
      ref={listRef}
      className="status-comment-list border-regular-10 mt-4 w-[40rem] rounded bg-base-200/50 p-4 shadow-md"
    >
      <div className="flex items-center justify-between border-b border-b-base-content/10 pb-2">
        <p className="text-lg">
          {t('label')} ({total})
        </p>
        <Tabs value={orderBy} onChange={switchOrderBy}>
          <Tab className="p-1" value="hot">
            {t('orderByHot')}
          </Tab>
          <Tab className="p-1" value="asc">
            {t('orderByAsc')}
          </Tab>
          <Tab className="p-1" value="desc">
            {t('orderByDesc')}
          </Tab>
        </Tabs>
      </div>
      <div className="list-body mt-4">
        {commentList.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={commentList.length === 0}
        loadMore={fetchCommentList}
      />
    </div>
  );
}
