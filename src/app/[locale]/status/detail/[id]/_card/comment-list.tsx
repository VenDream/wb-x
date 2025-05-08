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
import Tabs from '@/components/common/tabs';
import useDetectSticky from '@/hooks/use-detect-sticky';
import { cn } from '@/utils/classnames';
import { usePrevious } from 'ahooks';
import {
  ArrowDownUpIcon,
  ArrowUpDownIcon,
  FlameIcon,
  MessageSquareQuoteIcon,
} from 'lucide-react';
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
  const [orderBy, setOrderBy] = useState<Weibo.CommentsOrderBy>('hot');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const [commentList, setCommentList] = useState<Weibo.Comment[]>([]);

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

  const switchOrderBy = (orderBy: string | number) => {
    maxIdRef.current = '';
    setOrderBy(orderBy as Weibo.CommentsOrderBy);
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
        'rounded-box relative mt-4 w-[40rem] shadow-xs',
        props.className
      )}
    >
      <div
        ref={listHeaderRef}
        className={cn(
          'border-base-content/10 flex items-center justify-between border',
          'rounded-box sticky top-0 left-0 rounded-b-none p-4',
          'bg-base-200/30 z-10 w-full backdrop-blur-lg',
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
        <Tabs
          size="xs"
          name="comments-order"
          className="space-x-0 bg-transparent p-0"
          value={orderBy}
          onChange={switchOrderBy}
          items={[
            {
              label: t('orderByHot'),
              value: 'hot',
              icon: <FlameIcon size={16} />,
            },
            {
              label: t('orderByDesc'),
              value: 'desc',
              icon: <ArrowDownUpIcon size={16} />,
            },
            {
              label: t('orderByAsc'),
              value: 'asc',
              icon: <ArrowUpDownIcon size={16} />,
            },
          ]}
        />
      </div>
      <div
        className={cn(
          'rounded-box rounded-t-none border border-t-0',
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
          scrollLoading={{ enabled: !isLoadFailed, threshold: 200 }}
        />
      </div>
    </div>
  );
}
