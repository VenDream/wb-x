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
import { ArrowPathIcon, CircleStackIcon } from '@heroicons/react/24/outline';

interface StatUnitProps {
  title: string;
  value: number;
  desc: string;
}

function StatUnit({ title, value, desc }: StatUnitProps) {
  return (
    <Stat>
      <StatItem variant="title" className="font-bold">
        {title}
      </StatItem>
      <StatItem variant="value" className="my-1 text-primary">
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

  const statUnits: StatUnitProps[] = [
    {
      title: 'Total DB FileSize',
      value: fileSizeNum,
      desc: 'MB',
    },
    {
      title: 'Total Users',
      value: user,
      desc: 'records',
    },
    {
      title: 'Total Statuses',
      value: status,
      desc: 'records',
    },
    {
      title: 'Total Retweet Statuses',
      value: retweetStatus,
      desc: 'records',
    },
    {
      title: 'Total ROTNs',
      value: rotn,
      desc: 'records',
    },
  ];

  return (
    <div className="page-home">
      <h1 className="mb-1 flex items-center text-2xl">
        <CircleStackIcon className="mr-1 h-8 w-8" />
        Database Info
      </h1>
      <Stats className="my-4 border shadow">
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
