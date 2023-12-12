/*
 * Weibo Status Comment Item
 *
 * @Author: VenDream
 * @Date: 2023-12-11 11:46:38
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Avatar } from '@/components/daisyui';
import { FAKE_IMG } from '@/contants/debug';
import { getCreateTime } from '@/utils/weibo';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { preprocessCommentText } from './text-preprocessor';
import { comment, commentBody } from './variants';

import './comment-item.sass';

interface CommentItemProps {
  comment: Backend.StatusComment;
  isReply?: boolean;
  isReplyToSomeone?: boolean;
}

export default function CommentItem(props: CommentItemProps) {
  const t = useTranslations('pages.status.comments');
  const { isReply, isReplyToSomeone } = props;
  const {
    id,
    user,
    createdAt,
    source,
    text,
    comments,
    replyUser,
    isReplySelf,
  } = props.comment;

  const getUserName = useCallback(
    (user: Backend.StatusComment['replyUser']) => {
      if (!user) return 'UNKNOWN_USER';
      const username = `<a href="/n/${user.name}" target="_blank">@${user.name}</a>`;
      const opTag = `<span class="text-xs text-secondary border border-secondary px-0.5 ml-0.5">${t(
        'op'
      )}</span>`;
      return user.isOP ? username + opTag : username;
    },
    [t]
  );

  const userName = useMemo(() => {
    if (!isReply) return '';

    let userName = getUserName(user);
    if (isReplySelf || !isReplyToSomeone) return `${userName}:&nbsp;&nbsp;`;

    return `${userName}&nbsp;${t('replyTo')}&nbsp;${getUserName(
      replyUser
    )}:&nbsp;&nbsp;`;
  }, [getUserName, isReply, isReplySelf, isReplyToSomeone, replyUser, t, user]);

  return (
    <div
      className={comment({ type: isReply ? 'reply' : 'default' })}
      data-id={id}
    >
      {!isReply && (
        <div className="item-header grid grid-cols-[1fr,8fr] grid-rows-2 pt-4 tracking-tight">
          <Avatar
            src={FAKE_IMG || user.avatar}
            border
            size="xs"
            shape="circle"
            borderColor="primary"
            className="row-start-1 row-end-3 flex items-center justify-center"
          />
          <span className="flex items-center text-sm">
            {user.name}
            {user.isOP && (
              <span className="ml-0.5 border border-secondary px-0.5 text-secondary">
                {t('op')}
              </span>
            )}
          </span>
          <span className="flex items-center text-xs text-gray-500">
            {getCreateTime(createdAt)}
            {source && <span className="ml-2">{source}</span>}
          </span>
        </div>
      )}
      <div className={commentBody({ type: isReply ? 'reply' : 'default' })}>
        <div className="col-start-2 col-end-4">
          <div
            className="comment-text leading-5 tracking-tight"
            dangerouslySetInnerHTML={{
              __html: userName + preprocessCommentText(text),
            }}
          />
          {comments.length > 0 && (
            <div className="comment-replies mt-2 flex flex-col gap-1 bg-base-300/50 p-2">
              {comments.map((cm, idx) => {
                const prevComments = comments.slice(0, idx);
                const isReplyToSomeone = prevComments.some(
                  pcm => pcm.user.id === cm.replyUser?.id
                );
                return (
                  <CommentItem
                    key={cm.id}
                    comment={cm}
                    isReply
                    isReplyToSomeone={isReplyToSomeone}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
