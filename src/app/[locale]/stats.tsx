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
import { Stats as IStats, Stat, StatItem } from '@/components/daisyui';
import {
  BoxIcon,
  MessageSquareTextIcon,
  Repeat2Icon,
  ShirtIcon,
  UsersIcon,
} from 'lucide-react';
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
    <Stat className="min-w-80">
      <StatItem variant="figure" className="">
        {icon}
      </StatItem>
      <StatItem variant="title">{title}</StatItem>
      <StatItem variant="value" className="text-accent">
        <Counter from={0} to={value} />
      </StatItem>
      <StatItem variant="desc">{desc}</StatItem>
    </Stat>
  );
}

export default async function Stats() {
  const dbInfo = await getDatabaseInfo();
  const t = await getTranslations('pages.home');

  const { fileSize = '0MB', records } = dbInfo || {};
  const { user = 0, status = 0, retweetStatus = 0, rotn = 0 } = records || {};
  const fileSizeNum = +fileSize.split('MB')[0] || 0;
  const iconClass = 'relative top-1 text-accent';

  const statUnits: StatUnitProps[] = [
    {
      title: t('totalDbSize'),
      value: fileSizeNum,
      desc: 'MB',
      icon: <BoxIcon size={24} className={iconClass} />,
    },
    {
      title: t('totalUsers'),
      value: user,
      desc: t('records'),
      icon: <UsersIcon size={24} className={iconClass} />,
    },
    {
      title: t('totalStatuses'),
      value: status,
      desc: t('records'),
      icon: <MessageSquareTextIcon className={iconClass} />,
    },
    {
      title: t('totalRetweetStatuses'),
      value: retweetStatus,
      desc: t('records'),
      icon: <Repeat2Icon className={iconClass} />,
    },
    {
      title: t('totalRotns'),
      value: rotn,
      desc: t('records'),
      icon: <ShirtIcon className={iconClass} />,
    },
  ];

  return (
    <div>
      <IStats className="stats-vertical border border-base-content/20">
        {statUnits.map((unit, idx) => (
          <StatUnit key={idx} {...unit} />
        ))}
      </IStats>
    </div>
  );
}
