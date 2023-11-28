/*
 * Weibo Status Images
 *
 * @Author: VenDream
 * @Date: 2023-11-28 14:08:43
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { Slide, useLightbox } from '@/components/common/lightbox';
import { FAKE_IMG } from '@/contants/debug';
import { getImageVariants } from '@/utils/weibo';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

const MAX_DISPLAY_IMAGES = 9;

interface CardImagesProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardIamges(props: CardImagesProps) {
  const { status } = props;
  const { images } = status;

  const remainImagesNum = images.length - MAX_DISPLAY_IMAGES;

  const [slideIdx, setSlideIdx] = useState(0);
  const { openLightbox, renderLightbox } = useLightbox();
  const slides = useMemo<Slide[]>(() => {
    return images.map((img, idx) => {
      const { md, filename } = getImageVariants(img);
      return {
        type: 'image',
        src: FAKE_IMG || md,
        title: (
          <p className="h-[2rem] text-sm font-normal leading-[2rem]">
            {idx + 1} / {images.length} - {filename}
          </p>
        ),
      };
    });
  }, [images]);

  const previewImages = (idx: number) => {
    setSlideIdx(idx);
    openLightbox();
  };

  if (images.length <= 0) return null;

  return (
    <div className="status-images grid grid-cols-3 items-center justify-items-center gap-1">
      {images.slice(0, MAX_DISPLAY_IMAGES).map((img, idx) => {
        const { sm } = getImageVariants(img);
        const hasMore = idx === MAX_DISPLAY_IMAGES - 1 && remainImagesNum > 0;
        const dataProps = hasMore
          ? { 'data-remains': `+${remainImagesNum}` }
          : {};
        const className = clsx(
          'border-regular-5 aspect-square h-full w-full cursor-zoom-in rounded shadow-sm',
          {
            'has-more': hasMore,
          }
        );

        return (
          <div
            key={idx}
            {...dataProps}
            className={className}
            onClick={() => previewImages(idx)}
          >
            <Image
              src={FAKE_IMG || sm}
              alt="IMG"
              className="aspect-square h-full w-full rounded object-cover"
            />
          </div>
        );
      })}
      {renderLightbox({ slides, index: slideIdx })}
    </div>
  );
}
