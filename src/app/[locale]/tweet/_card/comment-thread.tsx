/*
 * Twitter Tweet Comment Thread
 *
 * @Author: VenDream
 * @Date: 2025-05-30 11:46:50
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { Button } from '@/components/daisyui';
import TweetCard from './card';
import type { CommentThreadProps } from './types';

export default function CommentThread(props: CommentThreadProps) {
  return (
    <div className="border-base-content/10 border-b">
      {props.thread.items.map(item => {
        const tweet = item as Twitter.ConversationTweet;
        const showMoreCursor = item as Twitter.ConversationShowMoreCursor;

        return tweet.id ? (
          <MotionContainer key={tweet.id}>
            <TweetCard tweet={tweet} isComment />
          </MotionContainer>
        ) : (
          <Button size="xs" link key={showMoreCursor.cursor}>
            Show More
          </Button>
        );
      })}
    </div>
  );
}
