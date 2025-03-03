/*
 * Global declarations
 *
 * @Author: VenDream
 * @Date: 2023-06-09 11:19:13
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import type { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';
import type { DEFAULT_THEMES } from 'react-daisyui/dist/defaultThemes';

declare global {
  /* ------------------------------------------------------------------------ */
  /*                                  Globals                                 */
  /* ------------------------------------------------------------------------ */
  type LocaleProps<T = any> = T & { params: { locale: string } };
  type ChildrenProps<T = any> = PropsWithChildren<T>;
  type ParamsBody = { params: Promise<Record<string, any>> };

  interface PaginationParams {
    /** limit */
    limit?: number;
    /** offset */
    offset?: number;
    /** return total or not */
    needTotal?: boolean;
  }

  type TFunction = ReturnType<typeof useTranslations>;

  type Themes = typeof DEFAULT_THEMES;
  type DarkTheme = readonly Extract<
    (typeof DEFAULT_THEMES)[number],
    | 'dark'
    | 'synthwave'
    | 'halloween'
    | 'forest'
    | 'aqua'
    | 'black'
    | 'luxury'
    | 'dracula'
    | 'business'
    | 'night'
    | 'coffee'
  >;

  /* ------------------------------------------------------------------------ */
  /*                                    App                                   */
  /* ------------------------------------------------------------------------ */
  namespace App {
    interface StoreState {}

    interface Settings {
      /** use image porxy */
      useImageProxy?: boolean;
      /** use video porxy */
      useVideoProxy?: boolean;
    }
  }

  namespace Backend {
    /* ---------------------------------------------------------------------- */
    /*                                  Misc                                  */
    /* ---------------------------------------------------------------------- */
    interface Cookie {
      /** index */
      idx: number;
      /** cookie value */
      value: string;
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

    interface DBList<T> {
      list: T[];
      total?: number;
    }

    /* ---------------------------------------------------------------------- */
    /*                                  User                                  */
    /* ---------------------------------------------------------------------- */
    interface User {
      /** id */
      id: string;
      /** name */
      name: string;
      /** description */
      desc: string;
      /** avatar */
      avatar: string;
      /** status count */
      statusesCount: number;
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
      video: StatusVideo | null;
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

    interface StatusVideo {
      /** id */
      id: string;
      /** mid */
      mid: string;
      /** uid */
      uid: string;
      /** url (temporary) */
      url?: string;
      /** title */
      title: string;
      /** cover */
      cover: string;
      /** topics */
      topics: string;
      /** duration */
      duration: number;
      /** duration string */
      durationStr: string;
    }

    type StatusListFilterParams = {
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
    };

    type CommentsOrderBy = 'asc' | 'desc' | 'hot';
    type CommentsRepliesOrderBy = 'time' | 'hot';

    interface StatusComment {
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
      replyUser: StatusComment['user'] | null;
      /** total replies */
      totalReplies: number;
      /** comments */
      comments: StatusComment[];
      /** has more replies */
      hasMoreReplies: boolean;
      /** is liked by author */
      isLikedByAuthor: boolean;
    }

    interface StatusCommentList {
      comments: StatusComment[];
      count: number;
      total: number;
      maxId: string;
    }

    /* ---------------------------------------------------------------------- */
    /*                                  ROTN                                  */
    /* ---------------------------------------------------------------------- */
    type ROTN_TYPE = 'ALL' | 'RO' | 'TN';

    interface ROTNItem {
      /** id */
      id: string;
      /** type */
      type: Type;
      /** item name */
      name: string;
      /** original url */
      url: string;
      /** item images */
      images: string[];
    }

    /* ---------------------------------------------------------------------- */
    /*                                 DB info                                */
    /* ---------------------------------------------------------------------- */
    interface DbInfo {
      /** db file size */
      size: string;
      tables: {
        /** user records */
        wb_users: number;
        /** status records */
        wb_statuses: number;
        /** rotn records */
        rotn_items: number;
      };
    }
  }
}

declare module 'react' {
  declare function IForwardRef<T, P = Record<string, any>>(
    render: (props: P, ref: Ref<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
