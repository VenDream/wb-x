'use client';

/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2023-06-09 16:55:48
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Tab, Tabs } from '@/components/daisyui';
import { useState } from 'react';

export default function Settings() {
  const [tab, setTab] = useState(0);

  return (
    <div className="settings">
      <Tabs value={tab} onChange={setTab} boxed>
        <Tab value={0}>Database</Tab>
        <Tab value={1}>Users</Tab>
      </Tabs>
    </div>
  );
}
