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
  type LocaleProps<T = any> = T & { params: { locale: string } };
  type ChildrenProps<T = any> = PropsWithChildren<T>;
  type ParamsBody = { params: Record<string, any> };

  interface PaginationParams {
    limit?: number;
    offset?: number;
    needTotal?: boolean;
  }

  namespace Backend {
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

    interface UserList {
      users: User[];
      count: number;
      total?: number;
    }
  }
}
