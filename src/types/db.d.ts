/*
 * Database Types
 *
 * @Author: VenDream
 * @Date: 2025-05-08 16:59:22
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

namespace DB {
  interface List<T> {
    list: T[];
    total?: number;
  }

  interface Info {
    size: string;
    tables: {
      wb_users: number;
      wb_statuses: number;
      twitter_users: number;
      twitter_tweets: number;
      rotn_items: number;
    };
  }
}
