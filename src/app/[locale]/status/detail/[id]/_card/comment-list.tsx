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
import GhostTabs from '@/components/common/ghost-tabs';
import LoadingIndicator from '@/components/common/loading-indicator';
import useDetectSticky from '@/hooks/use-detect-sticky';
import { cn } from '@/utils/classnames';
import { usePrevious } from 'ahooks';
import { ArrowUpDownIcon, MessageSquareQuoteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import CommentItem from './comment-item';
import type { CommentListProps } from './types';

export default function CommentList(props: CommentListProps) {
  const t = useTranslations('pages.status.comments');

  const maxIdRef = useRef('');
  const listRef = useRef<HTMLDivElement>(null);
  const listHeaderRef = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState<Backend.CommentsOrderBy>('hot');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const [commentList, setCommentList] = useState<Backend.StatusComment[]>([]);

  const prevOrderBy = usePrevious(orderBy);
  const prevCommentList = usePrevious(commentList);

  const isSticky = useDetectSticky(listHeaderRef);

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
      setIsLoadFailed(false);
      if (resp.maxId === '0' || !resp.comments.length) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
      setIsLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, props.id]);

  const switchOrderBy = (orderBy: Backend.CommentsOrderBy) => {
    maxIdRef.current = '';
    setOrderBy(orderBy);
  };

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  useEffect(() => {
    if (prevOrderBy !== undefined && prevOrderBy !== orderBy) {
      setCommentList([]);
      setIsLoadAll(false);
    }
  }, [orderBy, prevOrderBy]);

  useLayoutEffect(() => {
    if (
      prevCommentList !== undefined &&
      prevCommentList.length === 0 &&
      commentList.length > 0 &&
      location.hash === '#comments'
    ) {
      listRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [commentList.length, prevCommentList]);

  return (
    <div
      ref={listRef}
      className={cn(
        'relative mt-4 w-[40rem] rounded-[--rounded-box] shadow-sm',
        props.className
      )}
    >
      <div
        ref={listHeaderRef}
        className={cn(
          'flex items-center justify-between border border-base-content/10',
          'sticky left-0 top-0 rounded-[--rounded-box] rounded-b-none p-4',
          'z-10 w-full bg-base-200/30 backdrop-blur',
          {
            'rounded-t-none': isSticky,
          }
        )}
      >
        {!props.hideTitle && (
          <p className="flex items-center text-base">
            <MessageSquareQuoteIcon size={20} className="mr-2" />
            {t('label')} ({total})
          </p>
        )}
        <GhostTabs
          size="sm"
          value={orderBy}
          onChange={switchOrderBy}
          icon={<ArrowUpDownIcon size={16} className="text-base-content/50" />}
          options={[
            {
              label: t('orderByHot'),
              value: 'hot',
            },
            {
              label: t('orderByDesc'),
              value: 'desc',
            },
            {
              label: t('orderByAsc'),
              value: 'asc',
            },
          ]}
        />
      </div>
      <div
        className={cn(
          'rounded-[--rounded-box] rounded-t-none border border-t-0',
          'border-base-content/10 bg-base-200/30 p-4'
        )}
      >
        {commentList.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        <LoadingIndicator
          isLoading={isLoading}
          isLoadAll={isLoadAll}
          isNoData={commentList.length === 0}
          loadMore={fetchCommentList}
          scrollLoading={{ enable: !isLoadFailed, threshold: 500 }}
        />
      </div>
    </div>
  );
}
