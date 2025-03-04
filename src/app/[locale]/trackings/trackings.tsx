'use client';

/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { getUserByName } from '@/api/client';
import UserCard from '@/app/[locale]/user/list/[[...page]]/user-card';
import Counter from '@/components/common/counter';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { Button, Input, Stat, StatItem, Stats } from '@/components/daisyui';
import {
  AudioLinesIcon,
  CircleXIcon,
  RotateCcwIcon,
  UserPlusIcon,
  UserRoundSearchIcon,
  UsersIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface IProps {
  users: Backend.User[];
}

export default function Trackings(props: IProps) {
  const { users: initialUsers } = props;
  const t = useTranslations('pages.trackings');

  const [username, setUsername] = useState('');
  const [user, setUser] = useState<Backend.User>();
  const [users, setUsers] = useState<Backend.User[]>(initialUsers);

  const [isSearching, setIsSearching] = useState(false);
  const [searchFailedReason, setSearchFailedReason] = useState('');

  const searchUser = async () => {
    if (!username) {
      setSearchFailedReason(t('add.emptyTips'));
      return;
    }

    setUser(undefined);
    setSearchFailedReason('');

    try {
      setIsSearching(true);
      const user = await getUserByName(username);
      user.isTracking = users.some(u => u.id === user.id);
      setUser(user);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      setSearchFailedReason(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const reset = () => {
    setUsername('');
    setUser(undefined);
    setIsSearching(false);
    setSearchFailedReason('');
  };

  return (
    <MotionContainer className="space-y-8 px-1">
      <div className="space-y-4">
        <h1 className="flex items-center text-2xl">
          <UsersIcon size={24} className="mr-2" />
          {t('title')}
        </h1>
        <Stats className="stats-vertical border border-base-content/20">
          <Stat className="min-w-80">
            <StatItem variant="figure" className="">
              <AudioLinesIcon
                size={24}
                className="relative top-1 text-accent"
              />
            </StatItem>
            <StatItem variant="title">{t('stat.title')}</StatItem>
            <StatItem variant="value" className="text-accent">
              <Counter from={0} to={users.length} />
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
              onChange={e => {
                setUsername(e.target.value);
                setSearchFailedReason('');
              }}
              className="h-9 w-80 pr-10"
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
            {isSearching && (
              <MotionContainer>
                <Loading text={t('add.searchingTips')} />
              </MotionContainer>
            )}
            {searchFailedReason && (
              <MotionContainer>
                <p className="flex items-center gap-2 text-sm text-error">
                  <CircleXIcon size={20} className="text-error" />
                  {searchFailedReason}
                </p>
              </MotionContainer>
            )}
            {user && (
              <MotionContainer className="w-80">
                <UserCard
                  user={user}
                  onTrackUser={() => {
                    setUsers(users => [...users, user]);
                  }}
                  onUntrackUser={() => {
                    setUsers(users => users.filter(u => u.id !== user.id));
                  }}
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
