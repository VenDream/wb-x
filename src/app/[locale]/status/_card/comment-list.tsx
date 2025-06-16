'use client';

/*
 * Weibo Status Comment List
 *
 * @Author: VenDream
 * @Date: 2023-12-11 10:25:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import Tabs from '@/components/common/tabs';
import useDetectSticky from '@/hooks/use-detect-sticky';
import { useIsMobile } from '@/hooks/use-media-query';
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

  const isMobile = useIsMobile();
  const isSticky = useDetectSticky(listHeaderRef);
  const isDialogMode = isMobile && props.hideTitle;

  const fetchCommentList = useCallback(async () => {
    try {
      setIsLoading(true);
      const maxId = maxIdRef.current || '';
      const resp = await weibo.getStatusComments({
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
        'relative w-full lg:w-[40rem]',
        {
          '-mt-3.5': isDialogMode,
        },
        props.className
      )}
    >
      <div className="lg:shadow-xs">
        <div
          ref={listHeaderRef}
          className={cn(
            'border-base-content/10 top-0 left-0 flex items-center justify-between',
            'lg:rounded-box relative rounded-none p-4 lg:sticky lg:rounded-b-none',
            'bg-base-200/30 z-1 w-full border-y backdrop-blur-lg lg:border',
            {
              'lg:rounded-t-none': isSticky,
              hidden: isDialogMode,
            }
          )}
        >
          {!props.hideTitle && (
            <p className="flex items-center text-base">
              <MessageSquareQuoteIcon size={20} className="mr-2" />
              {t('label')} ({total})
            </p>
          )}
          {!isMobile && (
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
          )}
        </div>
        <div
          className={cn(
            'lg:rounded-box rounded-none lg:rounded-t-none lg:border lg:border-t-0',
            'border-base-content/10 border-none'
          )}
        >
          {commentList.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              displayMode={isDialogMode ? 'dialog' : undefined}
            />
          ))}
        </div>
      </div>
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={commentList.length === 0}
        loadMore={fetchCommentList}
        scrollLoading={{
          enabled: !isMobile && !isLoadFailed,
          threshold: 200,
        }}
        className="h-[3rem]"
      />
    </div>
  );
}
