/*
 * Weibo Types
 *
 * @Author: VenDream
 * @Date: 2025-05-08 16:35:51
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

namespace Weibo {
  /* ---------------------------------------------------------------------- */
  /*                                  User                                  */
  /* ---------------------------------------------------------------------- */
  interface User {
    /** user id */
    id: string;
    /** user name */
    name: string;
    /** description */
    desc: string;
    /** avatar */
    avatar: string;
    /** status count */
    statusCount: number;
    /** follow count */
    followCount: number;
    /** followers count */
    followersCount: string;
    /** is tracking */
    isTracking: boolean;
  }

  /* ---------------------------------------------------------------------- */
  /*                                 Status                                 */
  /* ---------------------------------------------------------------------- */
  interface Status {
    /** status id */
    id: string;
    /** status bid */
    bid: string;

    /** author */
    user: User;
    /** text */
    text: string;
    /** raw text */
    rawText: string;
    /** create at */
    createdAt: string;
    /** source */
    source: string;
    /** region */
    region: string;
    /** images count */
    imagesCount: number;
    /** images */
    images: string[];
    /** video */
    video: Video | null;
    /** reposts count */
    repostsCount: number;
    /** comments count */
    commentsCount: number;
    /** attitudes count */
    attitudesCount: number;
    /** retweeted status */
    retweetedStatus: Status | null;

    /** is top */
    isTop: boolean;
    /** is edited */
    isEdited: boolean;
    /** is original */
    isOriginal: boolean;
    /** is favourite */
    isFavourite: boolean;
    /** has video */
    hasVideo: boolean;
    /** has images */
    hasImages: boolean;
  }

  interface Video {
    /** video id */
    id: string;
    /** mid */
    mid: string;
    /** uid */
    uid: string;
    /** temp url (up to 2160P, expires after one hour) */
    url: string | null;
    /** title */
    title: string;
    /** cover */
    cover: string;
    /** topics */
    topics: string;
    /** duration */
    duration: number;
    /** duration str */
    durationStr: string;
  }

  /* ------------------------------------------------------------------------ */
  /*                                 Comments                                 */
  /* ------------------------------------------------------------------------ */
  type CommentsOrderBy = 'asc' | 'desc' | 'hot';
  type CommentsRepliesOrderBy = 'time' | 'hot';

  interface Comment {
    /** comment id */
    id: string;
    /** text */
    text: string;
    /** images */
    images: string[];
    /** source */
    source: string;
    /** region */
    region: string;
    /** raw text */
    rawText: string;
    /** create at */
    createdAt: string;
    /** likes count */
    likesCount: number;
    /** comment user */
    user: User & { isOP: boolean };
    /** reply user */
    replyUser: Comment['user'] | null;
    /** total replies */
    totalReplies: number;
    /** comments */
    comments: Comment[];
    /** has more replies */
    hasMoreReplies: boolean;
    /** is liked by author */
    isLikedByAuthor: boolean;
  }

  interface CommentList {
    comments: Comment[];
    count: number;
    total: number;
    maxId: string;
  }

  /* ------------------------------------------------------------------------ */
  /*                                  Params                                  */
  /* ------------------------------------------------------------------------ */
  interface UserListFilterParams {
    /** id */
    id?: string;
    /** keyword */
    keyword?: string;
    /** is tracking */
    isTracking?: boolean;
  }

  interface StatusListFilterParams {
    /** status id */
    id?: string;
    /** status uid */
    uid?: string;
    /** fav uid */
    favUid?: string;
    /** is tracking */
    isTracking?: boolean;
    /** is original */
    isOriginal?: boolean;
    /** is favourite */
    isFavourite?: boolean;
    /** has video */
    hasVideo?: boolean;
    /** has images */
    hasImages?: boolean;
    /** start date */
    startDate?: string;
    /** end date */
    endDate?: string;
    /** least images count */
    leastImagesCount?: number;

    /** order by */
    orderBy?: string;
    /** order */
    order?: 'asc' | 'desc';
    /** keyword */
    keyword?: string;
  }

  interface ScanningParams {
    /** uid */
    uid: string;
    /** sinceid */
    sinceid?: string;

    /** scan all or not */
    all?: boolean;
    /** upload or not */
    upload?: boolean;
    /** use cookie or not */
    useCookie?: boolean;
    /** force upload or not */
    forceUpload?: boolean;

    /** days to scan */
    days?: number;
    /** start date */
    startDate?: string;
    /** end date */
    endDate?: string;

    /** trigger only */
    triggerOnly?: boolean;
    /** all tracking uids */
    allTrackingUids?: boolean;
  }
}
