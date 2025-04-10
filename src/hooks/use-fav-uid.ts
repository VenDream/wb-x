/*
 * useFavUid
 *
 * @Author: VenDream
 * @Date: 2025-04-10 16:12:35
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { DEFAULT_FAV_UID } from '@/constants';
import useUser from '@/hooks/use-user';

export default function useFavUid() {
  const { user } = useUser();

  /**
   * @note use clerk user email as fav uid, may change in the future
   */
  const userEmail = user?.emailAddresses[0].emailAddress;
  const uid = userEmail || DEFAULT_FAV_UID;

  return uid;
}
