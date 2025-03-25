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
import {
  BoxIcon,
  MessageSquareTextIcon,
  ShirtIcon,
  UsersIcon,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type React from 'react';

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
  const { wb_users = 0, wb_statuses = 0, rotn_items = 0 } = tables || {};
  const fileSizeNum = +size.split('MB')[0] || 0;

  const statUnits: StatUnitProps[] = [
    {
      title: t('totalDbSize'),
      value: fileSizeNum,
      desc: 'MB',
      icon: <BoxIcon size={24} className="text-accent" />,
    },
    {
      title: t('totalUsers'),
      value: wb_users,
      desc: t('records'),
      icon: <UsersIcon size={24} className="text-accent" />,
    },
    {
      title: t('totalStatuses'),
      value: wb_statuses,
      desc: t('records'),
      icon: <MessageSquareTextIcon className="text-accent" />,
    },
    {
      title: t('totalRotns'),
      value: rotn_items,
      desc: t('records'),
      icon: <ShirtIcon className="text-accent" />,
    },
  ];

  return (
    <div>
      <IStats
        direction="vertical"
        className="border-base-content/10 bg-base-200 border"
      >
        {statUnits.map((unit, idx) => (
          <StatUnit key={idx} {...unit} />
        ))}
      </IStats>
    </div>
  );
}
