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

export interface CardProps {
  /** status */
  status: Backend.Status;
  /** is retweet status */
  isRetweet?: boolean;
  /** card menu */
  menu?: CardMenuOpts;
  /** render custom menus */
  renderCustomMenus?: (ctx: CardContext) => JSX.Element;
}

export interface CardContext {
  /** status */
  status: Backend.Status | null;
  /** is retweet status */
  isRetweet: boolean;
  /** card menu */
  menu: CardMenuOpts;
  /** render custom menus */
  renderCustomMenus?: (ctx: CardContext) => JSX.Element;
}

export interface CardMenuOpts {
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
