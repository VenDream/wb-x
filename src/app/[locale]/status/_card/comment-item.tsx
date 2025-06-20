/*
 * Weibo Status Comment Item
 *
 * @Author: VenDream
 * @Date: 2023-12-11 11:46:38
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useDialog } from '@/components/common/dialog';
import Image from '@/components/common/image';
import MediaGrid, { type ImageItem } from '@/components/common/media-grid';
import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import { Avatar } from '@/components/daisyui';
import { WEIBO_HOST } from '@/constants';
import { FAKE_IMG } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import { formatNumberWithUnit } from '@/utils/common';
import { getCreateTime } from '@/utils/datetime';
import { getImageVariants } from '@/utils/weibo';
import {
  ChevronDownIcon,
  MessageCircleMoreIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import CommentsReplies from './comments-replies';
import { preprocessCommentText } from './text-preprocessor';
import type { CommentItemProps } from './types';
import {
  type CommentVariants,
  comment,
  commentBody,
  commnetLikes,
} from './variants';

import { useIsMobile } from '@/hooks/use-media-query';
import './comment-item.css';

export default function CommentItem(props: CommentItemProps) {
  const t = useTranslations('pages.status.comments');
  const isMobile = useIsMobile();

  const { show: showDialog } = useDialog();
  const { sorter, isReply, isDetailReplies, displayMode } = props;
  const {
    id,
    user,
    createdAt,
    region,
    text,
    images,
    comments,
    likesCount,
    totalReplies,
    hasMoreReplies,
  } = props.comment;

  const getUserName = useCallback(
    (user: Weibo.Comment['replyUser']) => {
      if (!user) return 'UNKNOWN_USER';
      const username = `
        <a
          target="_blank"
          rel="noreferrer"
          class="username"
          href="${WEIBO_HOST}/${user.id}"
        >
          @${user.name}
        </a>
      `;
      const opTag = `
        <span
          style="zoom: 80%;"
          class="text-xs text-primary-content bg-primary px-1 py-0.5 mx-1 rounded-sm"
        >
          ${t('op')}
        </span>
      `;
      return user.isOP ? username + opTag : username;
    },
    [t]
  );

  const userName = useMemo(() => {
    if (!isReply) return '';
    return getUserName(user);
  }, [getUserName, isReply, user]);

  const createtime = useMemo(
    () => getCreateTime(createdAt, { relativeAlways: true }),
    [createdAt]
  );

  const imageItems = useMemo(
    () =>
      images.map<ImageItem>(image => {
        const { filename, origin, bmiddle, lg } = getImageVariants(image);
        return {
          type: 'image',
          src: lg,
          filename,
          download: origin,
          thumbnail: bmiddle,
        };
      }),
    [images]
  );

  const showCommentsReplies = (comment: Weibo.Comment) => {
    showDialog({
      footer: null,
      fullScreen: isMobile,
      title: t('replies'),
      icon: <MessageCircleMoreIcon size={20} className="mr-2" />,
      classNames: {
        wrapper: 'w-[40rem] h-[50rem] max-h-[85vh]',
        scrollArea: isMobile ? 'pr-0' : '!pr-4',
      },
      content: <CommentsReplies comment={comment} />,
    });
  };

  const isDialogMode = displayMode === 'dialog';
  const variantType: CommentVariants['type'] = isReply
    ? 'reply'
    : isDetailReplies
      ? 'detailReplies'
      : 'source';

  return (
    <MotionContainer
      data-id={id}
      disable={!!isDetailReplies}
      className={comment({ type: variantType, mode: displayMode })}
    >
      {!isReply && (
        <div
          className={cn('flex gap-3 lg:gap-4', {
            'px-1.5 py-0': isDialogMode,
            'px-1.5 py-1.5 lg:px-2 lg:py-2': isDetailReplies,
          })}
        >
          <Avatar className="flex items-center justify-center">
            <div
              className={cn(
                'outline-primary relative h-8 w-8 rounded-full lg:h-10 lg:w-10',
                'outline-2 outline-offset-3'
              )}
            >
              <Image
                alt={user.name}
                src={FAKE_IMG() || getImageVariants(user.avatar).sm}
              />
            </div>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="flex items-center text-sm">
              {user.name}
              {user.isOP && (
                <span
                  className={cn(
                    'ml-1 rounded-sm px-1 py-0.5 text-xs',
                    'text-primary-content bg-primary'
                  )}
                >
                  {t('op')}
                </span>
              )}
            </span>
            <span className="inline-flex items-center">
              <Tooltip message={createdAt} className="text-xs">
                <span
                  className={cn(
                    'text-base-content/50 flex cursor-text items-center text-xs'
                  )}
                >
                  {createtime}
                  {region && ` • ${region}`}
                </span>
              </Tooltip>
            </span>
          </div>
        </div>
      )}
      <div className={commentBody({ type: variantType, mode: displayMode })}>
        <div className="w-full space-y-2 lg:space-y-4">
          <div
            className={cn('comment-text text-left leading-5 break-all', {
              'text-justify': isReply,
            })}
            dangerouslySetInnerHTML={{
              __html:
                userName +
                preprocessCommentText(text, t, !!isReply) +
                (isReply
                  ? `
                    <span
                      style="zoom: 90%;"
                      title="${createdAt}"
                      class="text-xs text-base-content/50"
                    >
                      ${createtime}
                      ${region && ` • ${region}`}
                    </span>
                    `
                  : ''),
            }}
          />
          {!isReply && <MediaGrid cols={5} items={imageItems} />}
          {sorter}
          {comments.length > 0 && (
            <div
              className={cn(
                'comments-replies bg-base-200/50 flex flex-col gap-1 p-2',
                'border-base-content/10 rounded-sm border'
              )}
            >
              {comments.map(cm => (
                <CommentItem key={cm.id} comment={cm} isReply />
              ))}
            </div>
          )}
          {!isDetailReplies && hasMoreReplies && (
            <span
              className={cn(
                'relative inline-flex cursor-pointer items-center pt-2 text-xs lg:pt-4',
                'text-[#eb7340]'
              )}
              onClick={() => showCommentsReplies(props.comment)}
            >
              <div
                className={cn(
                  'w-full',
                  'bg-base-content/10 absolute top-0 left-0 h-[1px]'
                )}
              />
              {t('totalReplies', { num: totalReplies })}
              <ChevronDownIcon size={14} className="ml-1" />
            </span>
          )}
        </div>
      </div>
      <div className={commnetLikes({ type: variantType, mode: displayMode })}>
        <ThumbsUpIcon size={16} className="relative top-[-1px] mr-1" />
        {formatNumberWithUnit(likesCount || 0)}
      </div>
    </MotionContainer>
  );
}
