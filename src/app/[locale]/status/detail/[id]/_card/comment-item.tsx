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
import { comment, commentBody } from './variants';

import './comment-item.sass';

interface CommentItemProps {
  comment: Backend.StatusComment;
  isReply?: boolean;
}

export default function CommentItem(props: CommentItemProps) {
  const { isReply } = props;
  const { id, user, createdAt, source, text, comments } = props.comment;
  const userName = isReply
    ? `<a href="/n/${user.name}" target="_blank">@${user.name}:</a>&nbsp;&nbsp;`
    : '';

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
          <span className="flex items-center text-sm">{user.name}</span>
          <span className="flex items-center text-xs text-gray-500">
            {getCreateTime(createdAt)}
            {source && <span className="ml-2">{source}</span>}
          </span>
        </div>
      )}
      <div className={commentBody({ type: isReply ? 'reply' : 'default' })}>
        <div className="col-start-2 col-end-4">
          <div
            className="comment-text text-sm leading-6 tracking-tight"
            dangerouslySetInnerHTML={{ __html: userName + text }}
          />
          {comments.length > 0 && (
            <div className="comment-replies mt-2 rounded bg-base-300/50">
              {comments.map(cm => (
                <CommentItem key={cm.id} comment={cm} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
