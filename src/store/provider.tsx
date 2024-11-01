'use client';

/*
 * Client Jotai Provider
 *
 * @Author: VenDream
 * @Date: 2024-10-31 16:17:57
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getTrackingUsers } from '@/api/client';
import { useMount } from 'ahooks';
import { Provider } from 'jotai';
import { HydrationBoundary, RenderingBoundary } from 'jotai-ssr';
import React, { useCallback, useState } from 'react';
import store, { trackingUsersAtom } from '.';

type Props = {
  initialState: App.StoreState;
  children: React.ReactNode;
};

export function JotaiProvider({ initialState, children }: Props) {
  const { trackingUsers } = initialState;
  const [users, setUsers] = useState(trackingUsers);
  const [isReady, setIsReady] = useState(false);

  const fetchTrackingUsers = useCallback(async () => {
    try {
      const { userIds } = await getTrackingUsers();
      setUsers(userIds);
    } catch (err) {
      console.error('failed to fetch tracking users', err);
    } finally {
      setIsReady(true);
    }
  }, []);

  useMount(() => {
    if (trackingUsers.length <= 0) {
      fetchTrackingUsers();
    } else {
      setIsReady(true);
    }
  });

  return (
    isReady && (
      <Provider store={store}>
        <HydrationBoundary hydrateAtoms={[[trackingUsersAtom, users]]}>
          <RenderingBoundary performanceImpactingUseUpperStore>
            {children}
          </RenderingBoundary>
        </HydrationBoundary>
      </Provider>
    )
  );
}
