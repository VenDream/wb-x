/*
 * Global declarations
 *
 * @Author: VenDream
 * @Date: 2023-06-09 11:19:13
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { PropsWithChildren } from 'react';

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

  namespace Backend {
    /* ---------------------------------------------------------------------- */
    /*                                  user                                  */
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
      video: Video | null;
      /** reposts count */
      repostsCount: number;
      /** comments count */
      commentsCount: number;
      /** attitudes count */
      attitudesCount: number;
      /** retweeted status */
      retweetedStatus?: Status;
    }

    interface Video {
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

    interface StatusListFilterParams {
      /** uid */
      uid?: string;
      /** keyword */
      keyword?: string;
      /** start date */
      startDate?: string;
      /** end date */
      endDate?: string;
      /** need total flag */
      needTotal?: boolean;
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

/**
 * @refer https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
 */
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
