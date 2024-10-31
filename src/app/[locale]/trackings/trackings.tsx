'use client';

import useTrackings from '@/hooks/use-trackings';
import { getAppSettings } from '@/utils/settings';
import { useEffect } from 'react';

/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

export default function Trackings() {
  const [trackings] = useTrackings();

  useEffect(() => {
    const settings = getAppSettings();
    console.log(settings);
  }, []);

  return (
    <div>
      {trackings.map(t => (
        <p key={t}>{t}</p>
      ))}
    </div>
  );
}
