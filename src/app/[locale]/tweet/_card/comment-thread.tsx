/*
 * Twitter Tweet Comment Thread
 *
 * @Author: VenDream
 * @Date: 2025-05-30 11:46:50
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { twitter } from '@/api/client';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { Button } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { dedupeCommentThreadItems } from '@/utils/twitter';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import TweetCard from './card';
import { CommentListCtx } from './context';
import type { CommentThreadProps } from './types';

export default function CommentThread(props: CommentThreadProps) {
  const t = useTranslations('pages.tweet.comments');

  const { items } = props.thread;
  const { updateThread } = useContext(CommentListCtx);
  const [isLoading, setIsLoading] = useState(false);

  const showReplies = async (id: string, cursor: string) => {
    try {
      setIsLoading(true);
      const res = await twitter.getConversationDetail({
        id,
        cursor,
      });
      const newItems = res.detail[0].items;
      const newThread = {
        ...props.thread,
        items: dedupeCommentThreadItems([...items.slice(0, -1), ...newItems]),
      };
      updateThread(newThread);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-base-content/10 border-b">
      {items.map((item, idx) => {
        const tweet = item as Twitter.ConversationTweet;
        const showTimeline = items.length > 1 && idx !== items.length - 1;
        const cursor = item as Twitter.ConversationShowRepliesCursor;

        return tweet.id ? (
          <MotionContainer key={tweet.id}>
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              isComment
              showTimeline={showTimeline}
            />
          </MotionContainer>
        ) : (
          <div
            key={cursor.cursor}
            className={cn(
              'relative mb-4 ml-[70px]',
              'after:absolute after:top-1/4 after:left-[-20px] after:h-1/2',
              'after:border-l-base-content/50 after:border-l after:border-dotted'
            )}
          >
            {isLoading ? (
              <Loading size={14} className="ml-3 h-8" textClass="text-xs" />
            ) : (
              <Button
                link
                size="sm"
                onClick={() =>
                  showReplies(cursor.conversationId, cursor.cursor)
                }
              >
                {t('showReplies')}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
