'use client';

/*
 * Favourite Btn
 *
 * @Author: VenDream
 * @Date: 2025-03-03 15:40:23
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/client';
import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import { Button } from '@/components/daisyui';
import { favouriteBtnMotion } from '@/constants/motions';
import useFavUid from '@/hooks/use-fav-uid';
import { wbStatusFavouritesAtom } from '@/store';
import { cn } from '@/utils/classnames';
import { useAtom } from 'jotai';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface IProps {
  status: Weibo.Status;
}

export default function FavouriteBtn(props: IProps) {
  const t1 = useTranslations('pages.status.footer');
  const t2 = useTranslations('global.status');

  const favUid = useFavUid();
  const [isOperating, setIsOperating] = useState(false);
  const [statusFavourites, setStatusFavourites] = useAtom(
    wbStatusFavouritesAtom
  );

  const sid = props.status.id;
  const isFavourite = statusFavourites[sid] ?? props.status.isFavourite;

  const operatingTips = isFavourite
    ? t1('unfavouriteOperating')
    : t1('favouriteOperating');
  const operationOkTips = operatingTips + t2('success');
  const operationFailedTips = operatingTips + t2('error');

  const updateStatusFavourites = (patch: Record<string, boolean>) => {
    setStatusFavourites(favourites => ({
      ...favourites,
      ...patch,
    }));
  };

  const toggleStatusFavourites = () => {
    if (isOperating) return;

    const toggleAPI = isFavourite
      ? weibo.unfavouriteStatus
      : weibo.favouriteStatus;

    setIsOperating(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        toggleAPI(favUid, sid)
          .then(() => {
            updateStatusFavourites({ [sid]: !isFavourite });
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
      message={isFavourite ? t1('unfavourite') : t1('favourite')}
    >
      <Button
        link
        onClick={toggleStatusFavourites}
        className={cn(
          'text-base-content/60 m-0 h-auto min-h-0 gap-0 p-0 no-underline',
          'hover:text-accent text-xs active:!translate-none'
        )}
      >
        {isFavourite ? (
          <MotionContainer motion={favouriteBtnMotion}>
            <HeartIcon size={16} className="mr-1 fill-red-500 stroke-none" />
          </MotionContainer>
        ) : (
          <HeartIcon size={16} className="mr-1" />
        )}
      </Button>
    </Tooltip>
  );
}
