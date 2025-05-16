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
import { formatNumberWithUnit, htmlString } from '@/utils/common';
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

import './comment-item.css';

export default function CommentItem(props: CommentItemProps) {
  const t = useTranslations('pages.status.comments');
  const { show: showDialog } = useDialog();
  const { sorter, isReply, isDetailReplies } = props;
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
      const username = htmlString(`
        <a href="${WEIBO_HOST}/${user.id}" target="_blank" rel="noreferrer" class="username">
          @${user.name}
        </a>
      `);
      const opTag = htmlString(`
        <span style="zoom: 80%;"
          class="text-xs text-accent border border-accent px-0.5 ml-1"
        >
          ${t('op')}
        </span>
      `);
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
      title: t('replies'),
      icon: <MessageCircleMoreIcon size={20} className="mr-2" />,
      classNames: {
        wrapper: 'w-[40rem] h-[40rem] max-h-[85vh]',
        scrollArea: 'pr-6',
      },
      content: <CommentsReplies comment={comment} />,
    });
  };

  const variantType: CommentVariants['type'] = isReply ? 'reply' : 'source';

  return (
    <MotionContainer
      data-id={id}
      disable={!!isDetailReplies}
      className={comment({ type: variantType })}
    >
      {!isReply && (
        <div className="grid grid-cols-[1fr_8fr] grid-rows-2 pt-4">
          <Avatar className="row-start-1 row-end-3 flex items-center justify-center">
            <div
              className={cn(
                'outline-primary relative h-10 w-10 rounded-full',
                'outline-2 outline-offset-3'
              )}
            >
              <Image
                alt={user.name}
                src={FAKE_IMG() || getImageVariants(user.avatar).sm}
              />
            </div>
          </Avatar>
          <span className="flex items-center text-sm">
            {user.name}
            {user.isOP && (
              <span
                style={{ zoom: 0.8 }}
                className="border-accent text-accent ml-1 border px-0.5 text-xs"
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
      )}
      <div className={commentBody({ type: variantType })}>
        <div
          className={cn('col-start-2 col-end-4', {
            'space-y-4': true,
          })}
        >
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
                'comments-replies bg-base-200/30 flex flex-col gap-1 p-2',
                'border-base-content/10 mt-4 rounded-sm border'
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
                'relative mt-2 inline-flex cursor-pointer items-center text-xs',
                'text-[#eb7340]'
              )}
              onClick={() => showCommentsReplies(props.comment)}
            >
              <div
                className={cn(
                  'bg-base-content/10 absolute top-[-10px] left-0 h-[1px] w-full'
                )}
              />
              {t('totalReplies', { num: totalReplies })}
              <ChevronDownIcon size={14} className="ml-1 !stroke-2" />
            </span>
          )}
        </div>
      </div>
      <div className={commnetLikes({ type: variantType })}>
        <ThumbsUpIcon size={16} className="relative top-[-1px] mr-1" />
        {formatNumberWithUnit(likesCount || 0)}
      </div>
    </MotionContainer>
  );
}
