/*
 * Twitter Tweet Card Types
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:01:43
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

interface BaseCardProps {
  /** tweet */
  tweet: Twitter.Tweet;
  /** card menu */
  menu?: CardMenuOpts;
  /** is comment */
  isComment?: boolean;
  /** show timeline */
  showTimeline?: boolean;
}

export type TweetCardProps = BaseCardProps &
  (
    | {
        /** is retweeted/quoted tweet */
        isRetweet?: never;
        /** source tweet id */
        sourceTweetId?: never;
      }
    | {
        /** is retweeted/quoted tweet */
        isRetweet: true;
        /** source tweet id */
        sourceTweetId: string;
      }
  );

export interface CardContext {
  /** tweet */
  tweet: Twitter.Tweet | null;
  /** update tweet */
  updateTweet: (tweet: Partial<Twitter.Tweet>) => void;
  /** card menu */
  menu: CardMenuOpts;
  /** is comment */
  isComment: boolean;
  /** is retweeted/quoted tweet */
  isRetweet: boolean;
  /** source tweet id */
  sourceTweetId: string;
}

export interface CardMenuOpts {
  /** copy ID */
  copyId?: boolean;
  /** download images */
  dlImages?: boolean;
  /** view user info */
  viewUserInfo?: boolean;
  /** view comments */
  viewComments?: boolean;
  /** view original */
  viewOriginal?: boolean;
  /** view op posts */
  viewOpPosts?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  Comments                                  */
/* -------------------------------------------------------------------------- */

export interface CommentListProps {
  /** tweet id */
  id: string;
  /** className */
  className?: string;
  /** hide title */
  hideTitle?: boolean;
}

export interface CommentThreadProps {
  /** comment thread */
  thread: Twitter.ConversationThread;
}

export interface CommentItemProps {
  /** comment tweet */
  comment: Twitter.ConversationTweet;
}

export interface CommentListContext {
  /** update comment thread */
  updateThread: (thread: Twitter.ConversationThread) => void;
}
