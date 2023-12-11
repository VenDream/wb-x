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
import NoData from '@/components/common/no-data';
import useToast from '@/components/common/toast';
import { Button, Loading, Tab, Tabs } from '@/components/daisyui';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommentItem from './comment-item';

interface CommentListProps {
  id: string;
}

export default function CommentList(props: CommentListProps) {
  const { showErrorTips } = useToast();
  const t1 = useTranslations('global.dataFetching');
  const t2 = useTranslations('pages.status.comments');

  const maxIdRef = useRef('');
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
      maxIdRef.current = resp.maxId;
      if (resp.maxId === '0') setIsLoadAll(true);
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
    setOrderBy(orderBy);
    setCommentList([]);
  }, []);

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  return (
    <div className="status-comment-list border-regular-10 mt-4 w-[40rem] rounded bg-base-200/50 p-4 shadow-md">
      <div className="flex items-center justify-between border-b border-b-base-content/10 pb-2">
        <p className="text-lg">
          {t2('label')} ({total})
        </p>
        <Tabs value={orderBy} onChange={switchOrderBy}>
          <Tab className="p-1" value="hot">
            {t2('orderByHot')}
          </Tab>
          <Tab className="p-1" value="asc">
            {t2('orderByAsc')}
          </Tab>
          <Tab className="p-1" value="desc">
            {t2('orderByDesc')}
          </Tab>
        </Tabs>
      </div>
      <div className="list-body mt-4">
        {commentList.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="flex h-[6rem] items-center justify-center">
        {isLoading ? (
          <Loading color="primary" />
        ) : isLoadAll ? (
          <p className="text-sm">{t1('noMore')}</p>
        ) : commentList.length > 0 ? (
          <Button size="sm" onClick={fetchCommentList}>
            {t1('loadMore')}
          </Button>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
