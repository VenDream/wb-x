'use client';

/*
 * Twitter Tweet Comment List
 *
 * @Author: VenDream
 * @Date: 2025-05-29 16:56:15
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { twitter } from '@/api/client';
import LoadingIndicator from '@/components/common/loading-indicator';
import useDetectSticky from '@/hooks/use-detect-sticky';
import { cn } from '@/utils/classnames';
import { dedupeCommentList } from '@/utils/twitter';
import { MessageSquareQuoteIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import CommentThread from './comment-thread';
import { CommentListCtx } from './context';
import type { CommentListContext, CommentListProps } from './types';

type CommentList = Twitter.ConversationThread[];

export default function CommentList(props: CommentListProps) {
  const t = useTranslations('pages.tweet.comments');

  const cursorRef = useRef('');
  const listRef = useRef<HTMLDivElement>(null);
  const listHeaderRef = useRef<HTMLDivElement>(null);
  const [commentList, setCommentList] = useState<CommentList>([]);

  const [isLoadAll, setIsLoadAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  const isSticky = useDetectSticky(listHeaderRef);

  const updateThread = useCallback((thread: Twitter.ConversationThread) => {
    setCommentList(list => {
      const newList = [...list];
      const index = newList.findIndex(t => t.id === thread.id);
      if (index !== -1) newList[index] = thread;
      return newList;
    });
  }, []);

  const fetchCommentList = useCallback(async () => {
    try {
      setIsLoading(true);

      const { cursor, detail } = await twitter.getConversationDetail({
        id: props.id,
        cursor: cursorRef.current,
      });

      if (cursorRef.current === '') {
        setCommentList(detail);
      } else {
        setCommentList(list => {
          const newList = dedupeCommentList([...list, ...detail]);
          if (newList.length === list.length) setIsLoadAll(true);
          return newList;
        });
      }

      cursorRef.current = cursor;
      if (cursorRef.current === '' || !detail.length) setIsLoadAll(true);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
      setIsLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [props.id]);

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  const ctx = useMemo<CommentListContext>(
    () => ({
      updateThread,
    }),
    [updateThread]
  );

  return (
    <div
      ref={listRef}
      className={cn(
        'rounded-box relative w-[40rem] shadow-xs',
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
            'h-0 overflow-hidden border-t-0 p-0': props.hideTitle,
          }
        )}
      >
        <p className="flex items-center text-base">
          <MessageSquareQuoteIcon size={20} className="mr-2" />
          {t('label')}
        </p>
      </div>
      <div
        className={cn(
          'rounded-box rounded-t-none border border-t-0',
          'border-base-content/10 bg-base-200/30'
        )}
      >
        <CommentListCtx.Provider value={ctx}>
          {commentList.map(thread => (
            <CommentThread key={thread.id} thread={thread} />
          ))}
        </CommentListCtx.Provider>
        <LoadingIndicator
          className="h-[4rem]"
          isLoading={isLoading}
          isLoadAll={isLoadAll}
          isNoData={commentList.length === 0}
          loadMore={fetchCommentList}
          scrollLoading={{ enabled: false, threshold: 200 }}
        />
      </div>
    </div>
  );
}
