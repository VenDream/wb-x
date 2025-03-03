/*
 * Weibo Status Card Body
 *
 * @Author: VenDream
 * @Date: 2023-11-25 16:27:06
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getWeiboStatusDetail } from '@/api/client';
import { sleep } from '@/utils/common';
import EVENT_EMITTER, { RESIZE_ROW_ITEM } from '@/utils/eventemitter';
import { usePrevious } from 'ahooks';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Card from './card';
import CardImages from './card-images';
import CardVideo from './card-video';
import CardCtx from './context';
import { preprocessStatusText } from './text-preprocessor';
import { cardBody } from './variants';

export default function CardBody() {
  const t = useTranslations('pages.status');
  const { status, sourceStatusId, isRetweet, renderCustomMenus } =
    useContext(CardCtx);
  const { id, text, retweetedStatus } = status as Backend.Status;

  const [statusText, setStatusText] = useState(text);
  const prevStatusText = usePrevious(statusText);
  const [isLoadingFullText, setIsLoadingFullText] = useState(false);

  const showFullText = (evt: MouseEvent<HTMLDivElement>) => {
    const element = evt.target as HTMLElement;
    const isShowFullTextBtn = element.classList.contains('show-full-text');
    if (isLoadingFullText || !isShowFullTextBtn) return;

    setIsLoadingFullText(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        getWeiboStatusDetail(id)
          .then(status => {
            sleep(300).then(() => {
              setStatusText(status.text);
              setIsLoadingFullText(false);
              resolve();
            });
          })
          .catch(err => {
            setIsLoadingFullText(false);
            reject(err);
          })
      ),
      {
        loading: t('fullText.loading'),
        error: t('fullText.failed'),
      }
    );
  };

  useEffect(() => {
    if (prevStatusText !== undefined && prevStatusText !== statusText) {
      EVENT_EMITTER.emit(RESIZE_ROW_ITEM, isRetweet ? sourceStatusId : id);
    }
  }, [id, isRetweet, prevStatusText, sourceStatusId, statusText]);

  return (
    <div className={cardBody({ type: isRetweet ? 'retweet' : 'default' })}>
      <div className="col-start-2 col-end-4 space-y-4">
        <div
          onClick={showFullText}
          className="status-text pr-8 text-sm leading-6 tracking-tight"
          dangerouslySetInnerHTML={{
            __html: preprocessStatusText(statusText),
          }}
        />
        <CardImages />
        <CardVideo />
        {retweetedStatus && (
          <Card
            isRetweet
            sourceStatusId={id}
            status={retweetedStatus}
            renderCustomMenus={renderCustomMenus}
          />
        )}
      </div>
    </div>
  );
}
