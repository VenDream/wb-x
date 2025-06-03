/*
 * Twitter Types
 *
 * @Author: VenDream
 * @Date: 2025-05-08 16:36:09
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

namespace Twitter {
  type Platform = 'twitter';

  /* ------------------------------------------------------------------------ */
  /*                                   User                                   */
  /* ------------------------------------------------------------------------ */
  interface User {
    /** user id */
    id: string;
    /** `username@screen_name` */
    name: string;
    /** description */
    desc: string;
    /** link */
    link: string;
    /** avatar */
    avatar: string;
    /** banner image */
    banner: string;
    /** location */
    location: string;
    /** `username@screen_name` */
    screenName: string;
    /** created at */
    createdAt: string;
    /** media count */
    mediaCount: number;
    /** tweets count */
    tweetsCount: number;
    /** follow count */
    followCount: number;
    /** followers count */
    followersCount: number;
    /** is tracking */
    isTracking: boolean;
  }

  /* ------------------------------------------------------------------------ */
  /*                                   Tweet                                  */
  /* ------------------------------------------------------------------------ */
  interface Tweet {
    /** tweet id */
    id: string;

    /** author */
    user: User;
    /** text */
    text: string;
    /** raw text */
    rawText: string;
    /** created at */
    createdAt: string;
    /** source */
    source: string;
    /** images */
    images: string[];
    /** images count */
    imagesCount: number;
    /** videos */
    videos: Video[];
    /** videos count */
    videosCount: number;
    /** quoted tweet */
    quotedTweet: Tweet | null;
    /** retweeted tweet */
    retweetedTweet: Tweet | null;

    /** view count */
    viewCount: number;
    /** reposts count */
    repostsCount: number;
    /** comments count */
    commentsCount: number;
    /** bookmark count */
    bookmarkCount: number;
    /** favorite count */
    favoriteCount: number;

    /** is original */
    isOriginal: boolean;
    /** is favourite */
    isFavourite: boolean;
    /** has videos */
    hasVideos: boolean;
    /** has images */
    hasImages: boolean;
  }

  interface Video {
    /** video id */
    id: string;
    /** video url */
    url: string;
    /** video cover url */
    cover: string;
    /** video duration */
    duration: number;
    /** original video aspect ratio */
    aspectRatio: [number, number];
  }

  type ConversationTweet = Tweet;

  interface ConversationShowRepliesCursor {
    /** conversation id */
    conversationId: string;
    /** cursor */
    cursor: string;
  }

  interface ConversationThread {
    /** conversation thread id */
    id: string;
    /** conversation thread items */
    items: (ConversationTweet | ConversationShowRepliesCursor)[];
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

  interface TweetListFilterParams {
    /** tweet id */
    id?: string;
    /** tweet uid */
    uid?: string;
    /** fav uid */
    favUid?: string;
    /** is tracking */
    isTracking?: boolean;
    /** is original */
    isOriginal?: boolean;
    /** is favourite */
    isFavourite?: boolean;
    /** has videos */
    hasVideos?: boolean;
    /** has images */
    hasImages?: boolean;
    /** start date */
    startDate?: string;
    /** end date */
    endDate?: string;
    /** least images count */
    leastImagesCount?: number;
    /** least videos count */
    leastVideosCount?: number;

    /** order by */
    orderBy?: string;
    /** order */
    order?: 'asc' | 'desc';
    /** keyword */
    keyword?: string;
  }

  interface ConversationDetailParams {
    /** tweet id */
    id: string;
    /** cursor */
    cursor?: string;
  }

  interface ScanningParams {
    /** uid */
    uid: string;
    /** cursor */
    cursor?: string;

    /** scan all or not */
    all?: boolean;
    /** upload or not */
    upload?: boolean;
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
