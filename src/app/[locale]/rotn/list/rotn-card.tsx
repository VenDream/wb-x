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
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IProps {
  item: ROTN.BrandItem;
}

const CAROUSEL_GAP = 0;
const CAROUSEL_COLS = 1;

const getAspectRatio = (id: string) => {
  const idNum = +id;
  let ratio = ((idNum % 9) + 1) / ((idNum % 16) + 1);
  ratio = Math.min(ratio, 1);
  ratio = Math.max(ratio, 1 / 2);
  return ratio;
};

export default function RotnCard(props: IProps) {
  const { id, type, images, url } = props.item;
  const t = useTranslations('pages.rotn');

  const items = images.map((img, idx) => ({
    id: String(+id + idx),
    image: img,
  }));

  return (
    <MotionContainer
      className={cn(
        'border-base-content/10 flex flex-col gap-2 border p-4',
        'bg-base-200 rounded-box h-full text-sm shadow-sm'
      )}
    >
      <p className="flex items-center justify-between">
        <span className="text-sm select-none">
          {type} - {id}
        </span>
        <Tooltip message={t('sourceURLTips')} className="text-xs">
          <Link href={url} target="_blank" rel="noreferrer">
            <Button
              ghost
              size="sm"
              className="h-[2rem] w-[2rem] rounded-full p-0"
            >
              <SquareArrowOutUpRightIcon size={18} />
            </Button>
          </Link>
        </Tooltip>
      </p>
      {images.length > 0 ? (
        <Carousel
          lightbox
          items={items.splice(-1)}
          slideItems={items}
          buttons={false}
          counter={false}
          gap={CAROUSEL_GAP}
          cols={CAROUSEL_COLS}
          aspectRatio={getAspectRatio(id)}
        />
      ) : (
        <div
          className={cn(
            'text-base-content/50 flex flex-1 items-center justify-center',
            'bg-base-content/10 rounded-box aspect-square'
          )}
        >
          {t('noImages')}
        </div>
      )}
    </MotionContainer>
  );
}
