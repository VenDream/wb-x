/*
 * Global declarations
 *
 * @Author: VenDream
 * @Date: 2023-06-09 11:19:13
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';
import { DEFAULT_THEMES } from 'react-daisyui/dist/defaultThemes';

declare global {
  /* ------------------------------------------------------------------------ */
  /*                                  Globals                                 */
  /* ------------------------------------------------------------------------ */
  type LocaleProps<T = any> = T & { params: { locale: string } };
  type ChildrenProps<T = any> = PropsWithChildren<T>;
  type ParamsBody = { params: Record<string, any> };

  interface PaginationParams {
    /** page size */
    limit?: number;
    /** offset */
    offset?: number;
    /** need total flag */
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
      followersCount: number;
    }

    interface UserList {
      users: User[];
      count: number;
      total?: number;
    }

    /* ---------------------------------------------------------------------- */
    /*                                 Status                                 */
    /* ---------------------------------------------------------------------- */
    interface Status {
      /** id */
      id: string;
      /** author */
      user: User;
      /** content (rich text) */
      text: string;
      /** content (plaintext) */
      rawText: string;
      /** create time */
      createdAt: string;
      /** source */
      source: string;
      /** images count */
      imagesCount: number;
      /** image urls */
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
      retweetedStatus?: Status;
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

    interface StatusList {
      statuses: Status[];
      count: number;
      total?: number;
    }

    interface RetweetStatusList {
      retweetStatuses: Status[];
      count: number;
      total?: number;
    }

    type StatusListDataSource = 'trackings' | 'retweets';

    interface StatusListFilterParams {
      /** data source */
      dataSource?: StatusListDataSource;
      /** uid */
      uid?: string;
      /** keyword */
      keyword?: string;
      /** original flag */
      original?: boolean;
      /** least images count */
      leastImagesCount?: string;
      /** start date */
      startDate?: string;
      /** end date */
      endDate?: string;
      /** need total flag */
      needTotal?: boolean;
    }

    type CommentsOrderBy = 'asc' | 'desc' | 'hot';
    type CommentsRepliesOrderBy = 'time' | 'hot';

    interface StatusComment {
      /** comment Id */
      id: string;
      /** comment content (rich text) */
      text: string;
      /** comment images */
      images: string[];
      /** source */
      source: string;
      /** comment content (plaintext) */
      rawText: string;
      /** comment create time */
      createdAt: string;
      /** comment likes count */
      likesCount: number;
      /** commnet user */
      user: User & { isOP: boolean };
      /** replay user */
      replyUser: StatusComment['user'] | null;
      /** total replies */
      totalReplies: number;
      /** has more replies */
      hasMoreReplies: boolean;
      /** comment replies */
      comments: StatusComment[];
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

    interface ROTNItemList {
      items: ROTNItem[];
      count: number;
      total?: number;
    }

    /* ---------------------------------------------------------------------- */
    /*                                 DB info                                */
    /* ---------------------------------------------------------------------- */
    interface DbInfo {
      /** db file size */
      fileSize: string;
      records: {
        /** user records */
        user: number;
        /** status records */
        status: number;
        /** retweet status records */
        retweetStatus: number;
        /** rotn records */
        rotn: number;
      };
    }
  }
}

declare module 'react' {
  declare function IForwardRef<T, P = {}>(
    render: (props: P, ref: Ref<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
