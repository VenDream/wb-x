/*
 * Weibo Status Card Types
 *
 * @Author: VenDream
 * @Date: 2023-12-12 10:07:05
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

export interface CardProps {
  /** status */
  status: Backend.Status;
  /** is retweet status */
  isRetweet?: boolean;
  /** card menu */
  menu?: CardMenuOpts;
}

export interface CardContext {
  /** status */
  status: Backend.Status | null;
  /** is retweet status */
  isRetweet: boolean;
  /** card menu */
  menu: CardMenuOpts;
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
}
