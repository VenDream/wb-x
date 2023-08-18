/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDatabaseInfo } from '@/api';
import { Button, Stat, StatItem, Stats } from '@/components/daisyui';
import { ArrowPathIcon, CircleStackIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  const dbInfo = await getDatabaseInfo();

  return (
    <div className="page-home">
      <h1 className="mb-1 flex items-center text-2xl">
        <CircleStackIcon className="mr-1 h-8 w-8" />
        Database Info
      </h1>
      <Stats className="shadow-md" vertical>
        <Stat>
          <StatItem variant="title">Total Size</StatItem>
          <StatItem variant="value" className="text-primary">
            {dbInfo.fileSize || 'unknown'}
          </StatItem>
        </Stat>
        <Stat>
          <StatItem variant="title">Total User Records</StatItem>
          <StatItem variant="value" className="text-primary">
            {dbInfo.records.user || 0}
          </StatItem>
        </Stat>
        <Stat>
          <StatItem variant="title">Total Status Records</StatItem>
          <StatItem variant="value" className="text-primary">
            {dbInfo.records.status || 0}
          </StatItem>
        </Stat>
        <Stat>
          <StatItem variant="title">Total Retweet Status Records</StatItem>
          <StatItem variant="value" className="text-primary">
            {dbInfo.records.retweetStatus || 0}
          </StatItem>
        </Stat>
        <Stat>
          <StatItem variant="title">Total ROTN Records</StatItem>
          <StatItem variant="value" className="text-primary">
            {dbInfo.records.rotn || 0}
          </StatItem>
        </Stat>
      </Stats>
      <Button color="primary" className="mt-4 flex">
        <ArrowPathIcon className="mr-1" />
        Refresh
      </Button>
    </div>
  );
}
