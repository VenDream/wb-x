'use client';

import { getUserIdByName, searchUserById } from '@/api/client';
/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import UserCard from '@/app/[locale]/user/list/[[...page]]/user-card';
import Counter from '@/components/common/counter';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { Button, Input, Stat, StatItem, Stats } from '@/components/daisyui';
import useTrackings from '@/hooks/use-trackings';
import {
  AudioLinesIcon,
  RotateCcwIcon,
  UserPlusIcon,
  UserRoundSearchIcon,
  UsersIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Trackings() {
  const t = useTranslations('pages.trackings');
  const [trackings] = useTrackings();

  const [username, setUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingUser, setTrackingUser] = useState<Backend.User>();

  const searchUser = async () => {
    if (!username) {
      toast.error(t('add.emptyTips'));
      return;
    }

    setTrackingUser(undefined);

    try {
      setIsSearching(true);
      const { uid } = await getUserIdByName(username);
      const trackingUser = await searchUserById(uid);
      setTrackingUser(trackingUser);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(t('add.searchFailedTips', { reason: error.message }));
    } finally {
      setIsSearching(false);
    }
  };

  const reset = () => {
    setUsername('');
    setIsSearching(false);
    setTrackingUser(undefined);
  };

  return (
    <MotionContainer className="space-y-8 px-1">
      <div className="space-y-4">
        <h1 className="flex items-center text-2xl">
          <UsersIcon size={24} className="mr-2" />
          {t('title')}
        </h1>
        <Stats className="stats-vertical border border-base-content/10">
          <Stat className="min-w-[270px]">
            <StatItem variant="figure" className="">
              <AudioLinesIcon
                size={24}
                className="relative top-1 text-accent"
              />
            </StatItem>
            <StatItem variant="title">{t('stat.title')}</StatItem>
            <StatItem variant="value" className="text-accent">
              <Counter from={0} to={trackings.length} />
            </StatItem>
            <StatItem variant="desc">{t('stat.desc')}</StatItem>
          </Stat>
        </Stats>
      </div>
      <div className="space-y-4">
        <h1 className="flex items-center text-2xl">
          <UserPlusIcon size={24} className="mr-2" />
          {t('add.title')}
        </h1>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              size="sm"
              value={username}
              disabled={isSearching}
              onKeyDown={e => e.key === 'Enter' && searchUser()}
              onChange={e => setUsername(e.target.value)}
              className="h-9 w-60 pr-10"
              placeholder={t('add.placeholder')}
            />
            <Button
              size="sm"
              color="primary"
              onClick={searchUser}
              disabled={isSearching}
              startIcon={<UserRoundSearchIcon size={16} />}
              className="h-9 min-h-9"
            >
              {t('add.search')}
            </Button>
            <Button
              size="sm"
              color="ghost"
              onClick={reset}
              disabled={isSearching}
              startIcon={<RotateCcwIcon size={16} />}
              className="h-9 min-h-9 bg-base-content/10"
            >
              {t('add.reset')}
            </Button>
          </div>
          <div className="relative">
            {isSearching && <Loading text={t('add.searchingTips')} />}
            {trackingUser && (
              <MotionContainer className="w-80">
                <UserCard
                  user={trackingUser}
                  className="bg-transparent shadow-sm outline-base-content/20"
                />
              </MotionContainer>
            )}
          </div>
        </div>
      </div>
    </MotionContainer>
  );
}
