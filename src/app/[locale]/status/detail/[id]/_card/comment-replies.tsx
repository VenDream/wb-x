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
import useToast from '@/components/common/toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommentItem from './comment-item';
import type { CommentRepliesProps } from './types';

export default function CommentReplies(props: CommentRepliesProps) {
  const [comment, setComment] = useState(props.comment);
  const { showErrorTips } = useToast();

  const maxIdRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadAll, setIsLoadAll] = useState(false);

  const fetchCommentReplies = useCallback(async () => {
    try {
      setIsLoading(true);
      const maxId = maxIdRef.current || '';
      const resp = await getStatusCommentsReplies({
        id: comment.id,
        maxId,
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
      if (resp.maxId === '0') setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      showErrorTips(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [comment.id, showErrorTips]);

  useEffect(() => {
    fetchCommentReplies();
  }, [fetchCommentReplies]);

  return (
    <div className="comment-replies">
      <CommentItem comment={comment} isDetailReplies />
      <LoadingIndicator
        isLoading={isLoading}
        isLoadAll={isLoadAll}
        isNoData={comment.comments.length === 0}
        loadMore={fetchCommentReplies}
      />
    </div>
  );
}
