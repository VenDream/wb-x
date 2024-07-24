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
import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';

interface IProps {
  item: Backend.ROTNItem;
}

const CAROUSEL_GAP = 10;
const CAROUSEL_COLS = 3;
const CAROUSEL_ASPECT_RATIO = 9 / 16;

export default function RotnCard(props: IProps) {
  const { id, type, images } = props.item;
  const t = useTranslations('pages.rotn');

  const slides = images.map(img => ({ image: img }));

  return (
    <MotionContainer
      className={cn(
        'flex flex-col gap-2 rounded border border-base-content/10 p-4',
        'h-full rounded-[--rounded-box] bg-base-200/50 text-sm shadow'
      )}
    >
      <p className="text-sm">
        {type} - {id}
      </p>
      {images.length > 0 ? (
        <Carousel
          slides={slides}
          gap={CAROUSEL_GAP}
          cols={CAROUSEL_COLS}
          aspectRatio={CAROUSEL_ASPECT_RATIO}
        />
      ) : (
        <p className="text-base-content/50">{t('noImages')}</p>
      )}
    </MotionContainer>
  );
}
