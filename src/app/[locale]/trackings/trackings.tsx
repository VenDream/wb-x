'use client';

/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import useTrackings from '@/hooks/use-trackings';
import { settingsAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export default function Trackings() {
  const [trackings] = useTrackings();
  const settings = useAtomValue(settingsAtom);

  useEffect(() => {
    // const settings = getAppSettings();
    console.log(settings);
  }, [settings]);

  return (
    <div>
      {trackings.map(t => (
        <p key={t}>{t}</p>
      ))}
    </div>
  );
}
