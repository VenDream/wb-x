/*
 * Weibo Status Card Body
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { getImageVariants } from '@/utils/weibo';
import clsx from 'clsx';
import Card from './card';
import { cardBody } from './variants';

import './card-body.sass';

const MAX_DISPLAY_IMAGES = 9;

interface CardBodyProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardBody(props: CardBodyProps) {
  const { isRetweet } = props;
  const { user, text, images, retweetedStatus } = props.status;

  const remainImagesNum = images.length - MAX_DISPLAY_IMAGES;
  const userName = isRetweet
    ? `<a href="/n/${user.name}" target="_blank">@${user.name}:</a>&nbsp;&nbsp;`
    : '';

  return (
    <div className={cardBody({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="col-start-2 col-end-4">
        <div
          className="status-text mb-2 text-sm leading-6 tracking-tight"
          dangerouslySetInnerHTML={{ __html: userName + text }}
        ></div>
        {images.length > 0 && (
          <div className="status-images grid grid-cols-3 items-center justify-items-center gap-1">
            {images.slice(0, MAX_DISPLAY_IMAGES).map((img, idx) => {
              const { sm } = getImageVariants(img);
              const hasMore =
                idx === MAX_DISPLAY_IMAGES - 1 && remainImagesNum > 0;
              const dataProps = hasMore
                ? { 'data-remains': `+${remainImagesNum}` }
                : {};

              return (
                <div
                  key={idx}
                  {...dataProps}
                  className={clsx(
                    'border-regular-5 aspect-square h-full w-full cursor-zoom-in rounded shadow-sm',
                    {
                      'has-more': hasMore,
                    }
                  )}
                >
                  <Image
                    src={sm}
                    alt="IMG"
                    className="aspect-square h-full w-full rounded object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
        {retweetedStatus && (
          <div className="status-repost">
            <Card isRetweet status={retweetedStatus}></Card>
          </div>
        )}
      </div>
    </div>
  );
}
