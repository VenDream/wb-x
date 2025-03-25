/*
 * Weibo Status Comment Replies
 *
 * @Author: VenDream
 * @Date: 2023-12-15 16:34:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getStatusCommentsReplies } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import Tabs from '@/components/common/tabs';
import { usePrevious } from 'ahooks';
import { ArrowDownUpIcon, FlameIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import CommentItem from './comment-item';
import type { CommentsRepliesProps } from './types';

import './comments-replies.css';

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
  const [isLoadFailed, setIsLoadFailed] = useState(false);

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
  }, [comment.id, orderBy]);

  const switchOrderBy = (orderBy: string | number) => {
    maxIdRef.current = '';
    setOrderBy(orderBy as Backend.CommentsRepliesOrderBy);
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
          <Tabs
            size="xs"
            name="comments-replies-order"
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
                label: t('orderByTime'),
                value: 'time',
                icon: <ArrowDownUpIcon size={16} />,
              },
            ]}
          />
        }
      />
      <LoadingIndicator
        size="xs"
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={comment.comments.length === 0}
        loadMore={fetchCommentsReplies}
        scrollLoading={{ enabled: !isLoadFailed, threshold: 200 }}
      />
    </div>
  );
}
