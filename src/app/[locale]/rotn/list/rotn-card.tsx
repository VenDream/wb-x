/*
 * ROTN card
 *
 * @Author: VenDream
 * @Date: 2024-07-18 15:43:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import Carousel from '@/components/common/carousel';
import MotionContainer from '@/components/common/motion-container';
import Tooltip from '@/components/common/tooltip';
import { Button } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IProps {
  item: Backend.ROTNItem;
}

const CAROUSEL_GAP = 10;
const CAROUSEL_COLS = 1;
const CAROUSEL_ASPECT_RATIO = 9 / 16;

export default function RotnCard(props: IProps) {
  const { id, type, images, url } = props.item;
  const t = useTranslations('pages.rotn');

  const items = images.map(img => ({
    image: img,
  }));

  return (
    <MotionContainer
      className={cn(
        'flex flex-col gap-2 rounded border border-base-content/10 p-4',
        'h-full rounded-[--rounded-box] bg-base-200/30 text-sm shadow'
      )}
    >
      <p className="flex items-center justify-between">
        <span className="text-sm">
          {type} - {id}
        </span>
        <Tooltip message={t('sourceURLTips')}>
          <a href={url} target="_blank" rel="noreferrer">
            <Button
              size="sm"
              color="ghost"
              className="h-[2rem] w-[2rem] rounded-full p-0"
            >
              <SquareArrowOutUpRightIcon size={18} />
            </Button>
          </a>
        </Tooltip>
      </p>
      {images.length > 0 ? (
        <Carousel
          lightbox
          items={items.splice(-1)}
          buttons={false}
          counter={false}
          gap={CAROUSEL_GAP}
          cols={CAROUSEL_COLS}
          aspectRatio={CAROUSEL_ASPECT_RATIO}
        />
      ) : (
        <div className="flex flex-1 items-center justify-center text-base-content/50">
          {t('noImages')}
        </div>
      )}
    </MotionContainer>
  );
}
