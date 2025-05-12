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
import { LinkIcon, MapPinIcon, UsersIcon } from 'lucide-react';
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
  const t = useTranslations('pages.user');

  const { statusCount } = props.user as Weibo.User;
  const { screenName, tweetsCount, link, location } =
    props.user as Twitter.User;
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
      if (location) {
        items.push({
          icon: <MapPinIcon size={14} />,
          label: t('location'),
          content: location || '-',
        });
      }

      if (link) {
        items.push({
          icon: <LinkIcon size={14} />,
          label: t('homepage'),
          content: (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'text-xs break-all',
                'hover:text-accent hover:underline hover:underline-offset-3'
              )}
            >
              {link}
            </a>
          ),
        });
      }
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
      data-platform={props.platform}
      className={cn(
        'flex flex-col items-center justify-between gap-4 px-3 py-6',
        'bg-base-200/30 outline-base-content/10 rounded-box outline',
        'hover:outline-primary outline-1 hover:shadow',
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
          {isWeibo ? `@${name}` : name}
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
        className={cn(blockClasses, 'flex flex-col items-center gap-1 text-xs')}
      >
        {userMetaItems.map(item => (
          <div key={item.label} className="flex w-full items-center gap-2">
            <p className="flex basis-1/2 items-center justify-end gap-1">
              {item.icon}
              {item.label}
            </p>
            <p className="line-clamp-1 min-w-0 flex-1 text-left">
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
          className="border-primary max-w-64 border text-justify text-xs break-all"
        >
          <div
            className={cn(
              blockClasses,
              'text-center text-xs',
              'line-clamp-3 leading-normal break-all',
              {
                '[&_a]:hover:text-accent': isTwitter,
                '[&_a]:hover:underline': isTwitter,
                '[&_a]:hover:underline-offset-4': isTwitter,
              }
            )}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </Tooltip>
      ) : (
        <p className="text-base-content/50 text-center text-xs">
          {t('noDesc')}
        </p>
      )}
    </MotionContainer>
  );
}
