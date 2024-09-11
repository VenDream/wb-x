/*
 * Weibo Status Card Types
 *
 * @Author: VenDream
 * @Date: 2023-12-12 10:07:05
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

interface BaseCardProps {
  /** status */
  status: Backend.Status;
  /** card menu */
  menu?: CardMenuOpts;
  /** render custom menus */
  renderCustomMenus?: (ctx: CardContext) => JSX.Element;
}

export type CardProps =
  | (BaseCardProps & {
      /** is retweet status */
      isRetweet?: never;
      /** source status id */
      sourceStatusId?: never;
    })
  | (BaseCardProps & {
      /** is retweet status */
      isRetweet: true;
      /** source status id */
      sourceStatusId: string;
    });

export interface CardContext {
  /** status */
  status: Backend.Status | null;
  /** card menu */
  menu: CardMenuOpts;
  /** is retweet status */
  isRetweet: boolean;
  /** source status id */
  sourceStatusId: string;
  /** render custom menus */
  renderCustomMenus?: (ctx: CardContext) => JSX.Element;
}

export interface CardMenuOpts {
  /** copy ID */
  copyId?: boolean;
  /** copy UID */
  copyUid?: boolean;
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
  comment: Backend.StatusComment;
  /** if is a comment reply */
  isReply?: boolean;
  /** if is reply to someone */
  isReplyToSomeone?: boolean;
  /** if is detail replies  */
  isDetailReplies?: boolean;
}

export interface CommentRepliesProps {
  /** status comment */
  comment: Backend.StatusComment;
}
