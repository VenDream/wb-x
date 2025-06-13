'use client';

/*
 * Favourite Btn
 *
 * @Author: VenDream
 * @Date: 2025-03-03 15:40:23
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { twitter, weibo } from '@/api/client';
import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import { Button } from '@/components/daisyui';
import { favouriteBtnMotion } from '@/constants/motions';
import useFavUid from '@/hooks/use-fav-uid';
import { twTweetFavouritesAtom, wbStatusFavouritesAtom } from '@/store';
import { cn } from '@/utils/classnames';
import { useAtom } from 'jotai';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface IProps {
  platform: Platform;
  post: Weibo.Status | Twitter.Tweet;
}

export default function FavouriteBtn(props: IProps) {
  const { platform, post } = props;

  const isWeibo = platform === 'weibo';

  const t1 = useTranslations('global.status');

  const i18nKey = isWeibo ? 'pages.status.footer' : 'pages.tweet.footer';
  const t2 = useTranslations(i18nKey);

  const favUid = useFavUid();
  const [isOperating, setIsOperating] = useState(false);
  const [postFavourites, setPostFavourites] = useAtom(
    isWeibo ? wbStatusFavouritesAtom : twTweetFavouritesAtom
  );

  const postId = post.id;
  const isFavourite = postFavourites[postId] ?? post.isFavourite;

  const operatingTips = isFavourite
    ? t2('unfavouriteOperating')
    : t2('favouriteOperating');
  const operationOkTips = operatingTips + t1('success');
  const operationFailedTips = operatingTips + t1('error');

  const updatePostFavourites = (patch: Record<string, boolean>) => {
    setPostFavourites(favourites => ({
      ...favourites,
      ...patch,
    }));
  };

  const togglePostFavourites = () => {
    if (isOperating) return;

    const toggleAPI = isFavourite
      ? isWeibo
        ? weibo.unfavouriteStatus
        : twitter.unfavouriteTweet
      : isWeibo
        ? weibo.favouriteStatus
        : twitter.favouriteTweet;

    setIsOperating(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        toggleAPI(favUid, postId)
          .then(() => {
            updatePostFavourites({ [postId]: !isFavourite });
            resolve();
          })
          .catch((err: Error) => {
            reject(err);
          })
          .finally(() => {
            setIsOperating(false);
          })
      ),
      {
        loading: operatingTips,
        success: operationOkTips,
        error: (err: Error) => `${operationFailedTips}: ${err.message}`,
      }
    );
  };

  return (
    <Tooltip
      className="text-xs"
      message={isFavourite ? t2('unfavourite') : t2('favourite')}
    >
      <Button
        link
        onClick={togglePostFavourites}
        className={cn(
          'text-base-content/50 m-0 h-auto min-h-0 gap-0 p-0 no-underline',
          'hover:text-accent text-xs active:!translate-none'
        )}
      >
        {isFavourite ? (
          <MotionContainer motion={favouriteBtnMotion}>
            <HeartIcon size={16} className="fill-red-500 stroke-none" />
          </MotionContainer>
        ) : (
          <HeartIcon size={16} />
        )}
      </Button>
    </Tooltip>
  );
}
