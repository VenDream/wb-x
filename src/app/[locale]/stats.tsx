/*
 * DB Stats
 *
 * @Author: VenDream
 * @Date: 2024-01-08 15:33:33
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getDatabaseInfo } from '@/api/server';
import Counter from '@/components/common/counter';
import { Stats as IStats } from '@/components/daisyui';
import { ROTNIcon, TwitterIcon, WeiboIcon } from '@/components/icons';
import {
  BoxIcon,
  DatabaseIcon,
  SquareChartGanttIcon,
  UsersIcon,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type React from 'react';

interface StatBlock {
  title: string;
  icon: React.ReactNode;
  units: StatUnitProps[];
}

interface StatUnitProps {
  title: string;
  value: number;
  desc: string;
  icon: React.ReactNode;
}

function StatUnit({ title, value, desc, icon }: StatUnitProps) {
  return (
    <IStats.Stat className="min-w-64">
      <IStats.Figure>{icon}</IStats.Figure>
      <IStats.Title>{title}</IStats.Title>
      <IStats.Value className="text-accent">
        <Counter from={0} to={value} />
      </IStats.Value>
      <IStats.Desc>{desc}</IStats.Desc>
    </IStats.Stat>
  );
}

export default async function Stats() {
  const dbInfo = await getDatabaseInfo();
  const t = await getTranslations('pages.home');

  const { size = '0MB', tables } = dbInfo || {};
  const {
    wb_users = 0,
    wb_statuses = 0,
    twitter_users = 0,
    twitter_tweets = 0,
    rotn_items = 0,
  } = tables || {};
  const fileSizeNum = +size.split('MB')[0] || 0;

  const StatBlocks: StatBlock[] = [
    {
      title: t('dbTitle'),
      icon: <DatabaseIcon size={24} className="mr-2" />,
      units: [
        {
          title: t('totalDbSize'),
          value: fileSizeNum,
          desc: 'MB',
          icon: <BoxIcon size={24} className="text-accent" />,
        },
      ],
    },
    {
      title: t('rotnTitle'),
      icon: <ROTNIcon size={24} className="mr-2" />,
      units: [
        {
          title: t('totalRotns'),
          value: rotn_items,
          desc: t('records'),
          icon: <SquareChartGanttIcon className="text-accent" />,
        },
      ],
    },
    {
      title: t('wbTitle'),
      icon: <WeiboIcon size={24} className="mr-2" />,
      units: [
        {
          title: t('totalWeiboUsers'),
          value: wb_users,
          desc: t('records'),
          icon: <UsersIcon size={24} className="text-accent" />,
        },
        {
          title: t('totalWeiboStatuses'),
          value: wb_statuses,
          desc: t('records'),
          icon: <SquareChartGanttIcon className="text-accent" />,
        },
      ],
    },
    {
      title: t('twitterTitle'),
      icon: <TwitterIcon size={24} className="mr-2" />,
      units: [
        {
          title: t('totalTwitterUsers'),
          value: twitter_users,
          desc: t('records'),
          icon: <UsersIcon size={24} className="text-accent" />,
        },
        {
          title: t('totalTwitterTweets'),
          value: twitter_tweets,
          desc: t('records'),
          icon: <SquareChartGanttIcon className="text-accent" />,
        },
      ],
    },
  ];

  return StatBlocks.map((block, idx) => (
    <div key={idx} className="space-y-4">
      <h1 className="flex items-center text-2xl">
        {block.icon}
        {block.title}
      </h1>
      <IStats className="border-base-content/10 border">
        {block.units.map((unit, idx) => (
          <StatUnit key={idx} {...unit} />
        ))}
      </IStats>
    </div>
  ));
}
