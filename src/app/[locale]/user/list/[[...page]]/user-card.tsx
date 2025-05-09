/*
 * User card
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
import { TWITTER_HOST, WEIBO_HOST } from '@/constants';
import { FAKE_IMG } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import { extractPlainTextFromRichText } from '@/utils/common';
import { getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';

interface IProps {
  platform: Platform;
  user: Weibo.User | Twitter.User;
  className?: string;
  onTrackUser?: () => void;
  onUntrackUser?: () => void;
}

export default function UserCard(props: IProps) {
  const t = useTranslations('pages.user');

  const { screenName } = props.user as Twitter.User;
  const { id, name, avatar, desc, followCount, followersCount } = props.user;

  const isWeibo = props.platform === 'weibo';
  const isTwitter = props.platform === 'twitter';
  const blockClasses = 'w-[80%] text-center';

  if (!id || +id <= 0) return null;

  const userLink = isWeibo
    ? `${WEIBO_HOST}/${id}`
    : `${TWITTER_HOST}/${screenName}`;

  const descRawText = extractPlainTextFromRichText(desc);
  const descHtml = (
    <div
      className={cn(
        blockClasses,
        'line-clamp-2 h-[3em] text-xs leading-normal',
        {
          '*:hover:text-[#1da1f2]': isTwitter,
          '*:hover:underline': isTwitter,
          '*:hover:underline-offset-4': isTwitter,
        }
      )}
      dangerouslySetInnerHTML={{ __html: desc || '-' }}
    />
  );

  return (
    <MotionContainer
      data-platform={props.platform}
      className={cn(
        'flex flex-col items-center justify-between gap-4 px-2 py-6',
        'bg-base-200/30 outline-base-content/10 rounded-box outline',
        'hover:outline-info outline-1 hover:shadow',
        props.className
      )}
    >
      <Avatar>
        <div
          className={cn(
            'outline-primary relative h-12 w-12 rounded-full outline-2 outline-offset-3'
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
          target="_blank"
          rel="noreferrer"
          href={userLink}
          className={cn(
            blockClasses,
            'line-clamp-1 w-auto text-sm hover:underline',
            'hover:text-accent hover:underline-offset-4'
          )}
        >
          <p className="text-center">{isWeibo ? `@${name}` : name}</p>
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
      <p className={cn(blockClasses, 'text-xs')}>
        {t('follows')}：{followCount || 0}
        <br />
        {t('followers')}：{followersCount || 0}
      </p>
      <Tooltip
        delayDuration={500}
        message={descRawText}
        className="border-info max-w-64 border text-justify text-xs break-all"
      >
        {descHtml}
      </Tooltip>
    </MotionContainer>
  );
}
