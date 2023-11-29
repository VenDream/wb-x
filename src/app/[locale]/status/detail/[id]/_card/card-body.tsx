/*
 * Weibo Status Card Body
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Card from './card';
import CardImages from './card-images';
import CardVideo from './card-video';
import { cardBody } from './variants';

interface CardBodyProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardBody(props: CardBodyProps) {
  const { status, isRetweet } = props;
  const { user, text, video, retweetedStatus } = props.status;

  const userName = isRetweet
    ? `<a href="/n/${user.name}" target="_blank">@${user.name}:</a>&nbsp;&nbsp;`
    : '';

  return (
    <div className={cardBody({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="col-start-2 col-end-4">
        <div
          className="status-text mb-2 pr-8 text-sm leading-6 tracking-tight"
          dangerouslySetInnerHTML={{ __html: userName + text }}
        ></div>
        <CardImages status={status} isRetweet={isRetweet} />
        <CardVideo status={status} isRetweet={isRetweet} />
        {retweetedStatus && (
          <div className="status-repost">
            <Card isRetweet status={retweetedStatus}></Card>
          </div>
        )}
      </div>
    </div>
  );
}
