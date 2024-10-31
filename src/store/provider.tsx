'use client';

/*
 * Client Jotai Provider
 *
 * @Author: VenDream
 * @Date: 2024-10-31 16:17:57
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import React from 'react';

import store, { trackingUsersAtom } from '.';

type Props = {
  initialState: App.StoreState;
  children: React.ReactNode;
};

function StateWrapper({ initialState, children }: Props) {
  useHydrateAtoms([[trackingUsersAtom, initialState.trackingUsers]], {
    store,
    dangerouslyForceHydrate: true,
  });

  return children;
}

export function JotaiProvider({ initialState, children }: Props) {
  return (
    <Provider store={store}>
      <StateWrapper initialState={initialState}>{children}</StateWrapper>
    </Provider>
  );
}
