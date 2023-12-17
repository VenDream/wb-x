/*
 * Weibo Status Comment Item
 *
 * @Author: VenDream
 * @Date: 2023-12-11 11:46:38
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import useDialog from '@/components/common/dialog';
import ImageGrid from '@/components/common/image-grid';
import { Avatar } from '@/components/daisyui';
import { FAKE_IMG } from '@/contants/debug';
import { ARROW_DOWN_ICON } from '@/contants/svgs';
import { getCreateTime, getImageVariants } from '@/utils/weibo';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import CommentReplies from './comment-replies';
import { preprocessCommentText } from './text-preprocessor';
import type { CommentItemProps } from './types';
import { comment, commentBody } from './variants';

import './comment-item.sass';

export default function CommentItem(props: CommentItemProps) {
  const t = useTranslations('pages.status.comments');
  const { show: showDialog } = useDialog();
  const { isReply, isDetailReplies, isReplyToSomeone } = props;
  const {
    id,
    user,
    createdAt,
    source,
    text,
    images,
    comments,
    replyUser,
    isReplySelf,
    totalReplies,
    hasMoreReplies,
  } = props.comment;

  const getUserName = useCallback(
    (user: Backend.StatusComment['replyUser']) => {
      if (!user) return 'UNKNOWN_USER';
      const username = `<a href="/n/${user.name}" target="_blank">@${user.name}</a>`;
      const opTag = `<span class="text-xs text-primary border border-primary px-0.5 ml-0.5">${t(
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

  const showCommentReplies = (comment: Backend.StatusComment) => {
    showDialog({
      hideHeader: true,
      hideFooter: true,
      className: 'max-w-[40rem] rounded h-2/3',
      body: <CommentReplies comment={comment} />,
    });
  };

  return (
    <div
      className={comment({ type: isReply ? 'reply' : 'default' })}
      data-id={id}
    >
      {!isReply && (
        <div className="item-header grid grid-cols-[1fr,8fr] grid-rows-2 pt-4 tracking-tight">
          <Avatar
            src={FAKE_IMG || getImageVariants(user.avatar).sm}
            border
            size="xs"
            shape="circle"
            borderColor="primary"
            className="row-start-1 row-end-3 flex items-center justify-center"
          />
          <span className="flex items-center text-sm">
            {user.name}
            {user.isOP && (
              <span className="ml-0.5 border border-primary px-0.5 text-primary">
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
          <ImageGrid images={images} className="comment-images" cols={4} />
          {comments.length > 0 && (
            <div className="comment-replies mt-2 flex flex-col gap-1 rounded bg-base-300/50 p-2">
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
          {!isDetailReplies && hasMoreReplies && (
            <span
              className="relative mt-6 inline-flex cursor-pointer items-center text-xs text-[#eb7340]"
              onClick={() => showCommentReplies(props.comment)}
            >
              <div className="absolute left-0 top-[-8px] h-[1px] w-full bg-base-content/20" />
              {t('totalReplies', { num: totalReplies })}
              {ARROW_DOWN_ICON}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
