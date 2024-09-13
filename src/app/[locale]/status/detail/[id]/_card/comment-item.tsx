/*
 * Weibo Status Comment Item
 *
 * @Author: VenDream
 * @Date: 2023-12-11 11:46:38
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { useDialog } from '@/components/common/dialog';
import ImageGrid from '@/components/common/image-grid';
import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import { Avatar } from '@/components/daisyui';
import { WEIBO_HOST } from '@/contants';
import { FAKE_IMG } from '@/contants/debug';
import { cn } from '@/utils/classnames';
import { formatNumberWithUnit, htmlString } from '@/utils/common';
import { getCreateTime, getImageVariants } from '@/utils/weibo';
import {
  ChevronDownIcon,
  MessageCircleMoreIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import CommentsReplies from './comments-replies';
import {
  preprocessCommentText,
  preprocessSourceText,
} from './text-preprocessor';
import type { CommentItemProps } from './types';
import {
  CommentVariants,
  comment,
  commentBody,
  commnetLikes,
} from './variants';

import './comment-item.sass';

export default function CommentItem(props: CommentItemProps) {
  const t = useTranslations('pages.status.comments');
  const { show: showDialog } = useDialog();
  const { sorter, isReply, isDetailReplies } = props;
  const {
    id,
    user,
    createdAt,
    source,
    text,
    images,
    comments,
    likesCount,
    totalReplies,
    hasMoreReplies,
  } = props.comment;

  const getUserName = useCallback(
    (user: Backend.StatusComment['replyUser']) => {
      if (!user) return 'UNKNOWN_USER';
      const username = htmlString(`
        <a href="${WEIBO_HOST}/n/${user.name}" target="_blank">
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

  const sourceFrom = useMemo(
    () => (source ? preprocessSourceText(source) : ''),
    [source]
  );

  const showCommentsReplies = (comment: Backend.StatusComment) => {
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

  const variantType: CommentVariants['type'] = isReply ? 'reply' : 'default';

  return (
    <MotionContainer
      data-id={id}
      disable={!!isDetailReplies}
      className={comment({ type: variantType })}
    >
      {!isReply && (
        <div className="grid grid-cols-[1fr,8fr] grid-rows-2 pt-4 tracking-tight">
          <Avatar
            src={FAKE_IMG() || getImageVariants(user.avatar).sm}
            border
            size="xs"
            shape="circle"
            borderColor="primary"
            className="row-start-1 row-end-3 flex items-center justify-center"
          />
          <span className="flex items-center text-sm">
            {user.name}
            {user.isOP && (
              <span
                style={{ zoom: 0.8 }}
                className="ml-1 border border-accent px-0.5 text-xs text-accent"
              >
                {t('op')}
              </span>
            )}
          </span>
          <span className="inline-flex items-center">
            <Tooltip message={createdAt} className="text-xs">
              <span
                className={cn(
                  'flex cursor-text items-center text-xs text-base-content/50'
                )}
              >
                {createtime}
                {sourceFrom}
              </span>
            </Tooltip>
          </span>
        </div>
      )}
      <div className={commentBody({ type: variantType })}>
        <div className="col-start-2 col-end-4 space-y-4">
          <div
            className={cn(
              'comment-text break-all text-left leading-5 tracking-tight',
              {
                'text-justify': isReply,
              }
            )}
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
                      ${sourceFrom}
                    </span>
                    `
                  : ''),
            }}
          />
          {!isReply && <ImageGrid cols={5} isSinaImg images={images} />}
          {sorter}
          {comments.length > 0 && (
            <div
              className={cn(
                'comments-replies flex flex-col gap-1 bg-base-200/30 p-2',
                'rounded border border-base-content/10'
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
                'relative !mt-6 inline-flex cursor-pointer items-center text-xs',
                'text-[#eb7340]'
              )}
              onClick={() => showCommentsReplies(props.comment)}
            >
              <div
                className={cn(
                  'absolute left-0 top-[-10px] h-[1px] w-full bg-base-content/20'
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
