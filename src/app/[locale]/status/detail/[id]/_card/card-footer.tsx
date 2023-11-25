/*
 * Weibo Status Card Footer
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import {
  ArrowUpOnSquareIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { cardFooter } from './variants';

interface CardFooterProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardFooter(props: CardFooterProps) {
  const { isRetweet } = props;
  const { repostsCount, commentsCount, attitudesCount } = props.status;

  return (
    <div className={cardFooter({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="status-actions col-start-2 col-end-4 flex gap-4 text-xs tracking-tighter text-gray-500">
        <span className="flex items-center">
          <ArrowUpOnSquareIcon className="mr-1 h-4 w-4" />
          {repostsCount || 0}
        </span>
        <span className="flex items-center">
          <ChatBubbleLeftIcon className="mr-1 h-4 w-4" />
          {commentsCount || 0}
        </span>
        <span className="flex items-center">
          <HandThumbUpIcon className="mr-1 h-4 w-4" />
          {attitudesCount || 0}
        </span>
      </div>
    </div>
  );
}
