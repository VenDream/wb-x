/*
 * Weibo Status Comment Replies
 *
 * @Author: VenDream
 * @Date: 2023-12-15 16:34:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getStatusCommentsReplies } from '@/api/client';
import GhostTabs from '@/components/common/ghost-tabs';
import LoadingIndicator from '@/components/common/loading-indicator';
import { COMMENTS_REPLIES_PAGE_SIZE } from '@/contants';
import { usePrevious } from 'ahooks';
import { ArrowUpDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import CommentItem from './comment-item';
import type { CommentsRepliesProps } from './types';

import './comments-replies.sass';

export default function CommentsReplies(props: CommentsRepliesProps) {
  const t = useTranslations('pages.status.comments');
  const [comment, setComment] = useState<Backend.StatusComment>(() => ({
    ...props.comment,
    comments: [],
  }));

  const maxIdRef = useRef('');
  const [orderBy, setOrderBy] = useState<Backend.CommentsRepliesOrderBy>('hot');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);

  const prevOrderBy = usePrevious(orderBy);

  const fetchCommentsReplies = useCallback(async () => {
    try {
      setIsLoading(true);
      const maxId = maxIdRef.current || '';
      const resp = await getStatusCommentsReplies({
        id: comment.id,
        maxId,
        orderBy,
      });

      if (maxId === '') {
        setComment(cm => ({ ...cm, comments: resp.comments }));
      } else {
        setComment(cm => ({
          ...cm,
          comments: [...cm.comments, ...resp.comments],
        }));
      }
      maxIdRef.current = resp.maxId;

      if (
        resp.maxId === '0' ||
        resp.comments.length < COMMENTS_REPLIES_PAGE_SIZE
      ) {
        setIsLoadAll(true);
      }
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [comment.id, orderBy]);

  const switchOrderBy = (orderBy: Backend.CommentsRepliesOrderBy) => {
    maxIdRef.current = '';
    setOrderBy(orderBy);
  };

  useEffect(() => {
    fetchCommentsReplies();
  }, [fetchCommentsReplies]);

  useEffect(() => {
    if (prevOrderBy !== undefined && prevOrderBy !== orderBy) {
      setComment(cm => ({ ...cm, comments: [] }));
      setIsLoadAll(false);
    }
  }, [orderBy, prevOrderBy]);

  return (
    <div className="comments-replies">
      <CommentItem
        comment={comment}
        isDetailReplies
        sorter={
          <>
            <div className="h-[1px] bg-base-content/10" />
            <GhostTabs
              size="sm"
              value={orderBy}
              onChange={switchOrderBy}
              icon={
                <ArrowUpDownIcon size={16} className="text-base-content/50" />
              }
              options={[
                {
                  label: t('orderByHot'),
                  value: 'hot',
                },
                {
                  label: t('orderByTime'),
                  value: 'time',
                },
              ]}
            />
          </>
        }
      />
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={comment.comments.length === 0}
        loadMore={fetchCommentsReplies}
        scrollLoading={{ enable: true, threshold: 500 }}
      />
    </div>
  );
}
