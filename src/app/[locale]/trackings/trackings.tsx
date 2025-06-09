'use client';

/*
 * Trackings Page
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:05:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { twitter, weibo } from '@/api/client';
import { UserCard } from '@/app/[locale]/user/_card';
import Counter from '@/components/common/counter';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import Select from '@/components/common/select';
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
  weiboUsers: Weibo.User[];
  twitterUsers: Twitter.User[];
}

interface UsersList {
  platform: Platform;
  users: Weibo.User[] | Twitter.User[];
}

export default function Trackings(props: IProps) {
  const { weiboUsers: initWbUsers, twitterUsers: initTwUsers } = props;

  const t1 = useTranslations('global.platform');
  const t2 = useTranslations('pages.trackings');

  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<Platform>('weibo');

  const [weiboUser, setWeiboUser] = useState<Weibo.User>();
  const [weiboUsers, setWeiboUsers] = useState<Weibo.User[]>(initWbUsers);

  const [twitterUser, setTwitterUser] = useState<Twitter.User>();
  const [twitterUsers, setTwitterUsers] = useState<Twitter.User[]>(initTwUsers);

  const [isSearching, setIsSearching] = useState(false);
  const [searchFailedReason, setSearchFailedReason] = useState('');

  const isWeibo = platform === 'weibo';

  const apiClient = isWeibo ? weibo : twitter;
  const user = isWeibo ? weiboUser : twitterUser;
  const users = isWeibo ? weiboUsers : twitterUsers;

  const usersLists: UsersList[] = [
    {
      platform: 'weibo',
      users: weiboUsers,
    },
    {
      platform: 'twitter',
      users: twitterUsers,
    },
  ];

  const searchUser = async () => {
    if (!username) {
      setSearchFailedReason(t2('add.emptyTips'));
      return;
    }

    setWeiboUser(undefined);
    setTwitterUser(undefined);
    setSearchFailedReason('');

    try {
      setIsSearching(true);
      const searchUser = await apiClient.getUserByName(
        username.replace(/^@/, '')
      );
      searchUser.isTracking = users.some(u => u.id === searchUser.id);
      isWeibo
        ? setWeiboUser(searchUser as Weibo.User)
        : setTwitterUser(searchUser as Twitter.User);
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
    setWeiboUser(undefined);
    setTwitterUser(undefined);
    setIsSearching(false);
    setSearchFailedReason('');
  };

  return (
    <div className="space-y-8 px-1">
      <div className="space-y-4">
        <h1 className="flex items-center text-2xl">
          <UsersIcon size={24} className="mr-2" />
          {t2('title')}
        </h1>
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          {usersLists.map(list => (
            <Stats
              key={list.platform}
              className="stats-vertical border-base-content/20 border"
            >
              <Stats.Stat className="lg:min-w-80">
                <Stats.Figure className="">
                  <AudioLinesIcon
                    size={24}
                    className="text-accent relative top-1"
                  />
                </Stats.Figure>
                <Stats.Title>
                  {list.platform === 'weibo'
                    ? t2('stat.wbTitle')
                    : t2('stat.twTitle')}
                </Stats.Title>
                <Stats.Value className="text-accent">
                  <Counter from={0} to={list.users.length} />
                </Stats.Value>
                <Stats.Desc>{t2('stat.desc')}</Stats.Desc>
              </Stats.Stat>
            </Stats>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="flex items-center text-2xl">
          <UserPlusIcon size={24} className="mr-2" />
          {t2('add.title')}
        </h1>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Select
                value={platform}
                disabled={isSearching}
                className="h-9 w-24"
                inputClassName="h-9"
                menuClassName="w-24"
                onChange={value => {
                  setSearchFailedReason('');
                  setPlatform(value as Platform);
                }}
                options={[
                  { label: t1('weibo'), value: 'weibo' },
                  { label: t1('twitter'), value: 'twitter' },
                ]}
              />
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
                placeholder={t2('add.placeholder')}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                color="primary"
                onClick={searchUser}
                disabled={isSearching}
                className="h-9 min-h-9"
              >
                <UserRoundSearchIcon size={16} />
                {t2('add.search')}
              </Button>
              <Button
                size="sm"
                ghost
                onClick={reset}
                disabled={isSearching}
                className="bg-base-content/10 border-base-content/10 h-9 min-h-9"
              >
                <RotateCcwIcon size={16} />
                {t2('add.reset')}
              </Button>
            </div>
          </div>
          <div className="relative">
            {isSearching && (
              <MotionContainer>
                <Loading text={t2('add.searchingTips')} />
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
                  platform={platform}
                  onTrackUser={() => {
                    isWeibo
                      ? setWeiboUsers(users => [...users, user as Weibo.User])
                      : setTwitterUsers(users => [
                          ...users,
                          user as Twitter.User,
                        ]);
                  }}
                  onUntrackUser={() => {
                    isWeibo
                      ? setWeiboUsers(users =>
                          users.filter(u => u.id !== user.id)
                        )
                      : setTwitterUsers(users =>
                          users.filter(u => u.id !== user.id)
                        );
                  }}
                  className="outline-base-content/20 bg-transparent shadow-xs"
                />
              </MotionContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
