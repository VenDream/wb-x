/*
 * User Card Mini Ver.
 *
 * @Author: VenDream
 * @Date: 2025-06-10 14:09:28
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Dialog } from '@/components/common/dialog';
import Image from '@/components/common/image';
import MotionContainer from '@/components/common/motion-container';
import TrackingsBtn from '@/components/common/trackings-btn';
import { Avatar, Button } from '@/components/daisyui';
import { FAKE_IMG } from '@/constants/debug';
import useUser from '@/hooks/use-user';
import { cn } from '@/utils/classnames';
import * as twitterUtils from '@/utils/twitter';
import * as weiboUtils from '@/utils/weibo';
import { EllipsisIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { UserCardProps } from './card';
import UserCard from './card';

export default function MiniUserCard(props: UserCardProps) {
  const t = useTranslations('pages.users.dialog');

  const { id, name, avatar } = props.user;
  const { isAdmin } = useUser();

  const isWeibo = props.platform === 'weibo';
  const getImageVariants = isWeibo
    ? weiboUtils.getImageVariants
    : twitterUtils.getImageVariants;
  const avatarSrc = FAKE_IMG(+id % 1000) || getImageVariants(avatar).sm;

  return (
    <MotionContainer
      className={cn(
        'bg-base-100 rounded-box h-16 min-h-16',
        'flex items-center justify-start gap-4 px-4',
        'border-base-content/10 border shadow-xs',
        props.className
      )}
    >
      <Avatar>
        <div
          className={cn(
            'relative h-10 w-10 rounded-full',
            'outline-primary outline-2 outline-offset-3'
          )}
        >
          <Image alt={name} src={avatarSrc} />
        </div>
      </Avatar>
      <div className="flex flex-1 flex-col gap-2">
        <p className="line-clamp-1 text-start break-all">{name}</p>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <TrackingsBtn
              iconOnly
              iconSize={12}
              className="h-5 w-8"
              user={props.user}
              platform={props.platform}
              onTrackUser={props.onTrackUser}
              onUntrackUser={props.onUntrackUser}
            />
          )}
          <Dialog
            cancelBtn={null}
            okBtnProps={{ className: 'w-40' }}
            classNames={{
              footer: 'justify-center',
            }}
          >
            <Dialog.Title>{t('title')}</Dialog.Title>
            <Dialog.Trigger asChild>
              <Button
                size="xs"
                ghost
                className="bg-base-content/10 border-base-content/10 h-5 w-8"
              >
                <EllipsisIcon size={14} />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <UserCard
                {...props}
                full
                className="hover:border-base-content/10"
              />
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
    </MotionContainer>
  );
}
