/*
 * Weibo Status Card Types
 *
 * @Author: VenDream
 * @Date: 2023-12-12 10:07:05
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import type { ReactNode } from 'react';

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

interface BaseCardProps {
  /** status */
  status: Weibo.Status;
  /** card menu */
  menu?: CardMenuOpts;
}

export type CardProps = BaseCardProps &
  (
    | {
        /** is retweet status */
        isRetweet?: never;
        /** source status id */
        sourceStatusId?: never;
      }
    | {
        /** is retweet status */
        isRetweet: true;
        /** source status id */
        sourceStatusId: string;
      }
  );

export interface CardContext {
  /** status */
  status: Weibo.Status | null;
  /** update status */
  updateStatus: (status: Partial<Weibo.Status>) => void;
  /** card menu */
  menu: CardMenuOpts;
  /** is retweet status */
  isRetweet: boolean;
  /** source status id */
  sourceStatusId: string;
}

export interface CardMenuOpts {
  /** copy ID */
  copyId?: boolean;
  /** view user info */
  viewUserinfo?: boolean;
  /** download images */
  dlImages?: boolean;
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
  /** status id */
  id: string;
  /** className */
  className?: string;
  /** hide title */
  hideTitle?: boolean;
}

export interface CommentItemProps {
  /** status comment */
  comment: Weibo.Comment;
  /** comment sorter */
  sorter?: ReactNode;
  /** if is a comment reply */
  isReply?: boolean;
  /** if is detail replies  */
  isDetailReplies?: boolean;
}

export interface CommentsRepliesProps {
  /** status comment */
  comment: Weibo.Comment;
}
