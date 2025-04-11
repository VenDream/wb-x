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
import { Button, Input, Stats } from '@/components/daisyui';
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
      const user = await getUserByName(username.replace(/^@/, ''));
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
        <Stats className="stats-vertical border-base-content/20 border">
          <Stats.Stat className="min-w-80">
            <Stats.Figure className="">
              <AudioLinesIcon
                size={24}
                className="text-accent relative top-1"
              />
            </Stats.Figure>
            <Stats.Title>{t('stat.title')}</Stats.Title>
            <Stats.Value className="text-accent">
              <Counter from={0} to={users.length} />
            </Stats.Value>
            <Stats.Desc>{t('stat.desc')}</Stats.Desc>
          </Stats.Stat>
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
              className="h-9 min-h-9"
            >
              <UserRoundSearchIcon size={16} />
              {t('add.search')}
            </Button>
            <Button
              size="sm"
              ghost
              onClick={reset}
              disabled={isSearching}
              className="bg-base-content/10 border-base-content/10 h-9 min-h-9"
            >
              <RotateCcwIcon size={16} />
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
                <p className="text-error flex items-center gap-2 text-sm">
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
                  className="outline-base-content/20 bg-transparent shadow-xs"
                />
              </MotionContainer>
            )}
          </div>
        </div>
      </div>
    </MotionContainer>
  );
}
