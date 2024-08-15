/*
 * Weibo Status Card Body
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { WEIBO_HOST } from '@/contants';
import { useContext } from 'react';
import Card from './card';
import CardImages from './card-images';
import CardVideo from './card-video';
import CardCtx from './context';
import { preprocessStatusText } from './text-preprocessor';
import { cardBody } from './variants';

export default function CardBody() {
  const { status, isRetweet, renderCustomMenus } = useContext(CardCtx);
  const { user, text, retweetedStatus } = status!;

  const userName = isRetweet
    ? `<a href="${WEIBO_HOST}/n/${user.name}" target="_blank">@${user.name}:</a>&nbsp;&nbsp;`
    : '';

  return (
    <div className={cardBody({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="col-start-2 col-end-4">
        <div
          className="status-text mb-2 pr-8 text-sm leading-6 tracking-tight"
          dangerouslySetInnerHTML={{
            __html: userName + preprocessStatusText(text),
          }}
        />
        <CardImages />
        <CardVideo />
        {retweetedStatus && (
          <Card
            isRetweet
            status={retweetedStatus}
            renderCustomMenus={renderCustomMenus}
          />
        )}
      </div>
    </div>
  );
}
