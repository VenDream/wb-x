/*
 * DB Stats
 *
 * @Author: VenDream
 * @Date: 2024-01-08 15:33:33
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getDatabaseInfo } from '@/api/server';
import { refreshDbInfo } from '@/app/actions';
import Counter from '@/components/common/counter';
import RouterRefresh from '@/components/common/router-refresh';
import { Button, Stats as IStats, Stat, StatItem } from '@/components/daisyui';
import {
  ArrowPathIcon,
  CircleStackIcon,
  CubeIcon,
  InboxStackIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';
import React from 'react';

interface StatUnitProps {
  title: string;
  value: number;
  desc: string;
  icon: React.ReactNode;
}

function StatUnit({ title, value, desc, icon }: StatUnitProps) {
  return (
    <Stat>
      <StatItem variant="figure">{icon}</StatItem>
      <StatItem variant="title">{title}</StatItem>
      <StatItem variant="value" className="text-primary">
        <Counter to={value} />
      </StatItem>
      <StatItem variant="desc">{desc}</StatItem>
    </Stat>
  );
}

export default async function Stats({ locale }: { locale: string }) {
  const dbInfo = await getDatabaseInfo();
  const gt = await getTranslations({ locale, namespace: 'global' });
  const ht = await getTranslations({ locale, namespace: 'pages.home' });

  const { fileSize = '0MB', records } = dbInfo || {};
  const { user = 0, status = 0, retweetStatus = 0, rotn = 0 } = records || {};
  const fileSizeNum = +fileSize.split('MB')[0] || 0;
  const iconClass = 'relative top-1 h-6 w-6 text-secondary';

  const statUnits: StatUnitProps[] = [
    {
      title: ht('totalDbSize'),
      value: fileSizeNum,
      desc: 'MB',
      icon: <CubeIcon className={iconClass} />,
    },
    {
      title: ht('totalUsers'),
      value: user,
      desc: ht('records'),
      icon: <UsersIcon className={iconClass} />,
    },
    {
      title: ht('totalStatuses'),
      value: status,
      desc: ht('records'),
      icon: <InboxStackIcon className={iconClass} />,
    },
    {
      title: ht('totalRetweetStatuses'),
      value: retweetStatus,
      desc: ht('records'),
      icon: <InboxStackIcon className={iconClass} />,
    },
    {
      title: ht('totalRotns'),
      value: rotn,
      desc: ht('records'),
      icon: <InboxStackIcon className={iconClass} />,
    },
  ];

  return (
    <div className="rounded bg-base-200 p-4">
      <h1 className="mb-1 flex items-center text-2xl">
        <CircleStackIcon className="relative top-[-2px] mr-1 h-8 w-8" />
        {ht('title')}
      </h1>
      <IStats className="stats-vertical my-4 border border-base-content/10 bg-base-200 2xl:stats-horizontal">
        {statUnits.map((unit, idx) => (
          <StatUnit key={idx} {...unit} />
        ))}
      </IStats>
      <br />
      <RouterRefresh action={refreshDbInfo}>
        <Button color="primary" className="flex" size="sm">
          <ArrowPathIcon className="mr-1" />
          {gt('action.refresh')}
        </Button>
      </RouterRefresh>
    </div>
  );
}
