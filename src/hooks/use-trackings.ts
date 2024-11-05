/*
 * useTrackings
 *
 * @Author: VenDream
 * @Date: 2024-10-30 10:54:16
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { trackingUsersAtom } from '@/store';
import { useAtom } from 'jotai';

export function useIsTracking(userId: string) {
  const [trackingsUsers] = useTrackings();
  return trackingsUsers.includes(userId);
}

export default function useTrackings() {
  const trackingsAtom = useAtom(trackingUsersAtom);
  return trackingsAtom;
}
