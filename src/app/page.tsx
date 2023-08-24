/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDatabaseInfo } from '@/api';
import Counter from '@/components/common/counter';
import RouterRefresh from '@/components/common/router-refresh';
import { Button, Stat, StatItem, Stats } from '@/components/daisyui';
import {
  ArrowPathIcon,
  CircleStackIcon,
  CubeIcon,
  InboxStackIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
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
      <StatItem variant="title" className="font-bold">
        {title}
      </StatItem>
      <StatItem variant="value" className="text-primary">
        <Counter to={value}></Counter>
      </StatItem>
      <StatItem variant="desc">{desc}</StatItem>
    </Stat>
  );
}

export default async function Home() {
  const dbInfo = await getDatabaseInfo();
  const { fileSize = '0MB', records } = dbInfo || {};
  const { user = 0, status = 0, retweetStatus = 0, rotn = 0 } = records || {};
  const fileSizeNum = +fileSize.split('MB')[0] || 0;
  const iconClass = 'relative top-1 h-6 w-6 text-secondary';

  const statUnits: StatUnitProps[] = [
    {
      title: 'Total DB FileSize',
      value: fileSizeNum,
      desc: 'MB',
      icon: <CubeIcon className={iconClass} />,
    },
    {
      title: 'Total Users',
      value: user,
      desc: 'records',
      icon: <UsersIcon className={iconClass} />,
    },
    {
      title: 'Total Statuses',
      value: status,
      desc: 'records',
      icon: <InboxStackIcon className={iconClass} />,
    },
    {
      title: 'Total Retweet Statuses',
      value: retweetStatus,
      desc: 'records',
      icon: <InboxStackIcon className={iconClass} />,
    },
    {
      title: 'Total ROTNs',
      value: rotn,
      desc: 'records',
      icon: <InboxStackIcon className={iconClass} />,
    },
  ];

  return (
    <div className="page-home">
      <h1 className="mb-1 flex items-center text-2xl">
        <CircleStackIcon className="mr-1 h-8 w-8" />
        Database Info
      </h1>
      <Stats className="stats-vertical my-4 border shadow lg:stats-horizontal">
        {statUnits.map((unit, idx) => (
          <StatUnit key={idx} {...unit} />
        ))}
      </Stats>
      <RouterRefresh auto>
        <Button color="primary" className="flex">
          <ArrowPathIcon className="mr-1" />
          Refresh
        </Button>
      </RouterRefresh>
    </div>
  );
}
