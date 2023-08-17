'use client';

/*
 * Settings Page
 *
 * @Author: VenDream
 * @Date: 2023-06-09 16:55:48
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useState } from 'react';
import { Tabs } from 'react-daisyui';

const { Tab } = Tabs;

export default function Settings() {
  const [tab, setTab] = useState(0);

  return (
    <div className="settings">
      <Tabs value={tab} onChange={setTab} boxed>
        <Tab value={0}>Tab1</Tab>
        <Tab value={1}>Tab2</Tab>
        <Tab value={2}>Tab3</Tab>
      </Tabs>
    </div>
  );
}
