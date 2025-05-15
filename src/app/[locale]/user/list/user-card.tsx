/*
 * User Card
 *
 * @Author: VenDream
 * @Date: 2024-07-18 14:06:36
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import TrackingsBtn from '@/components/common/trackings-btn';
import { Avatar } from '@/components/daisyui';
import { TwitterIcon, WeiboIcon } from '@/components/icons';
import { TWITTER_HOST, WEIBO_HOST } from '@/constants';
import { FAKE_IMG } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import { extractPlainTextFromRichText } from '@/utils/common';
import { getImageVariants } from '@/utils/weibo';
import {
  LinkIcon,
  MapPinIcon,
  SquareArrowOutUpRightIcon,
  UsersIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface IProps {
  platform: Platform;
  user: Weibo.User | Twitter.User;
  className?: string;
  onTrackUser?: () => void;
  onUntrackUser?: () => void;
}

interface UserMetaItem {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

export default function UserCard(props: IProps) {
  const t = useTranslations('pages.users');

  const wbUser = props.user as Weibo.User;
  const twUser = props.user as Twitter.User;

  const { statusCount } = wbUser;
  const { screenName, tweetsCount, link, location } = twUser;
  const { id, name, avatar, desc, followCount, followersCount } = props.user;

  const isWeibo = props.platform === 'weibo';
  const isTwitter = props.platform === 'twitter';
  const blockClasses = 'w-[80%] text-center';

  const postTitle = isWeibo ? t('wbPosts') : t('twPosts');
  const postCount = isWeibo ? statusCount : tweetsCount;

  const userLink = isWeibo
    ? `${WEIBO_HOST}/${id}`
    : `${TWITTER_HOST}/${screenName}`;

  const descText = useMemo(
    () => (desc ? extractPlainTextFromRichText(desc) : ''),
    [desc]
  );

  const userMetaItems: UserMetaItem[] = useMemo(() => {
    const items: UserMetaItem[] = [
      {
        icon: isTwitter ? <TwitterIcon size={14} /> : <WeiboIcon size={14} />,
        label: postTitle,
        content: postCount || 0,
      },
      {
        icon: <UsersIcon size={14} />,
        label: t('follows'),
        content: followCount || 0,
      },
      {
        icon: <UsersIcon size={14} />,
        label: t('followers'),
        content: followersCount || 0,
      },
    ];

    if (isTwitter) {
      link &&
        items.push({
          icon: <LinkIcon size={14} />,
          label: t('homepage'),
          content: (
            <Tooltip message={link} className="border-primary text-xs">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'hover:text-accent text-xs break-all',
                  'hover:underline hover:underline-offset-3'
                )}
              >
                {t('visit')}{' '}
                <SquareArrowOutUpRightIcon size={13} className="inline" />
              </a>
            </Tooltip>
          ),
        });
      location &&
        items.push({
          icon: <MapPinIcon size={14} />,
          label: t('location'),
          content: location || '-',
        });
    }

    return items;
  }, [
    followCount,
    followersCount,
    isTwitter,
    link,
    location,
    postCount,
    postTitle,
    t,
  ]);

  if (!id || +id <= 0) return null;

  return (
    <MotionContainer
      className={cn(
        'flex flex-col items-center justify-between gap-4 px-3 py-6',
        'bg-base-200/30 border-base-content/10 rounded-box border',
        'hover:border-primary group border-1 hover:shadow',
        props.className
      )}
    >
      <Avatar>
        <div
          className={cn(
            'relative h-12 w-12 rounded-full',
            'outline-primary outline-2 outline-offset-3'
          )}
        >
          <Image
            alt={name}
            src={FAKE_IMG(+id % 1000) || getImageVariants(avatar).sm}
          />
        </div>
      </Avatar>
      <div className="flex w-[80%] flex-col items-center gap-0.5">
        <a
          title={name}
          target="_blank"
          rel="noreferrer"
          href={userLink}
          className={cn(
            blockClasses,
            'line-clamp-1 w-auto text-center text-sm',
            'hover:text-accent hover:underline hover:underline-offset-4'
          )}
        >
          {name}
        </a>
        {isTwitter && (
          <p className="text-base-content/50 w-full text-center text-xs">
            {`@${screenName}`}
          </p>
        )}
      </div>
      <TrackingsBtn
        user={props.user}
        platform={props.platform}
        onTrackUser={props.onTrackUser}
        onUntrackUser={props.onUntrackUser}
      />
      <div className="bg-base-content/10 h-[1px] w-full" />
      <div
        className={cn(
          blockClasses,
          'flex flex-col items-center gap-1 text-xs',
          {
            'h-[3.5rem]': isWeibo,
            'h-[6rem]': isTwitter,
          }
        )}
      >
        {userMetaItems.map((item, idx) => (
          <div key={idx} className="flex w-full items-center gap-2">
            <p className="flex basis-1/2 items-center justify-end gap-1">
              {item.icon}
              {item.label}
            </p>
            <p
              title={typeof item.content === 'string' ? item.content : ''}
              className="line-clamp-1 min-w-0 flex-1 text-left break-all"
            >
              {item.content}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-base-content/10 h-[1px] w-full" />
      {desc ? (
        <Tooltip
          delayDuration={500}
          message={descText}
          className="border-primary max-w-72 text-justify text-xs break-all"
        >
          <div
            className={cn(
              blockClasses,
              'h-[3em] text-center text-xs',
              'line-clamp-2 leading-normal break-all',
              {
                '[&_a]:hover:text-accent': isTwitter,
                '[&_a]:hover:underline': isTwitter,
                '[&_a]:hover:underline-offset-3': isTwitter,
              }
            )}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </Tooltip>
      ) : (
        <p className="text-base-content/50 h-[3em] text-center text-xs">
          {t('noDesc')}
        </p>
      )}
    </MotionContainer>
  );
}
