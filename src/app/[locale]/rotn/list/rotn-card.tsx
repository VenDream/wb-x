/*
 * ROTN card
 *
 * @Author: VenDream
 * @Date: 2024-07-18 15:43:17
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import ImageGrid from '@/components/common/image-grid';
import MotionContainer from '@/components/common/motion-container';
import { cn } from '@/utils/classnames';
import { useTranslations } from 'next-intl';

interface IProps {
  item: Backend.ROTNItem;
}

export default function RotnCard(props: IProps) {
  const { id, type, images } = props.item;
  const t = useTranslations('pages.rotn');

  return (
    <MotionContainer>
      <div
        className={cn(
          'flex flex-col gap-2 rounded border border-base-content/10 p-4',
          'h-full rounded-[--rounded-box] bg-base-200/50 text-sm shadow'
        )}
      >
        <p className="text-sm">
          {type} - {id}
        </p>
        {images.length > 0 ? (
          <ImageGrid
            cols={2}
            images={images}
            showHasMoreIndicator
            className="gap-2 2xl:gap-4"
          />
        ) : (
          <p className="text-base-content/50">{t('noImages')}</p>
        )}
      </div>
    </MotionContainer>
  );
}
