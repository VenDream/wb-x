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
    limit?: number;
    offset?: number;
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
      /** 微博Id */
      id: string;
      /** 微博bid */
      bid: string;
      /** 作者 */
      user: User;
      /** 正文 */
      text: string;
      /** 正文(纯文本) */
      rawText: string;
      /** 创建时间 */
      createdAt: string;
      /** 来源 */
      source: string;
      /** 附图数量 */
      imagesCount: number;
      /** 图片(原图) */
      images: Image[];
      /** 视频(1080P) */
      video: Video | null;
      /** 转发 */
      repostsCount: number;
      /** 评论 */
      commentsCount: number;
      /** 点赞 */
      attitudesCount: number;
      /** 是否置顶 */
      isTop: boolean;
      /** 是否有查看权限 */
      visible: boolean;
      /** 转发的微博 */
      retweetedStatus?: Status;
    }

    interface Image {
      /** 图片Id */
      id: string;
      /** 图片url(原图) */
      url: string;
      /** 图片宽度 */
      width: number;
      /** 图片高度 */
      height: number;
    }

    interface Video {
      /** 视频Id */
      id: string;
      /** 归属的微博Id */
      mid: string;
      /** 视频创作者Id */
      uid: string;
      /** 临时视频链接(1080P，一般是一小时后过期) */
      url?: string;
      /** 视频标题 */
      title: string;
      /** 视频封面 */
      cover: string;
      /** 话题 */
      topics: string;
      /** 时长 */
      duration: number;
      /** 格式化的时长 */
      durationStr: string;
    }

    interface StatusList {
      statuses: Status[];
      count: number;
      total?: number;
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
