/*
 * Image Grid
 *
 * @Author: VenDream
 * @Date: 2023-12-15 15:57:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { Slide, useLightbox } from '@/components/common/lightbox';
import { FAKE_IMG } from '@/contants/debug';
import { cn } from '@/utils/classnames';
import { getImageVariants } from '@/utils/weibo';
import { useMemo, useState } from 'react';

import './image-grid.sass';

interface ImageGridProps {
  images: string[];
  cols?: 2 | 3 | 4 | 5;
  className?: string;
  showHasMoreIndicator?: boolean;
}

export default function ImageGrid(props: ImageGridProps) {
  const { images, className, cols = 3, showHasMoreIndicator } = props;
  const { openLightbox, renderLightbox } = useLightbox();

  const [slideIdx, setSlideIdx] = useState(0);
  const slides = useMemo<Slide[]>(() => {
    return images.map((img, idx) => {
      const { lg, origin, filename } = getImageVariants(img);
      return {
        type: 'image',
        src: FAKE_IMG || lg,
        title: (
          <p className="h-[2rem] text-sm font-normal leading-[2rem]">
            {idx + 1} / {images.length} - {filename}
          </p>
        ),
        download: FAKE_IMG || origin,
      };
    });
  }, [images]);

  const MAX_DISPLAY_IMAGES = Math.pow(cols, 2);
  const REMAIN_IMAGES_NUM = images.length - MAX_DISPLAY_IMAGES;
  const DISPLAY_IMAGES_NUM = !!showHasMoreIndicator
    ? MAX_DISPLAY_IMAGES
    : images.length;
  const GRID_COLS_CLASS =
    cols === 2
      ? 'grid-cols-2'
      : cols === 3
        ? 'grid-cols-3'
        : cols === 4
          ? 'grid-cols-4'
          : 'grid-cols-5';

  const previewImages = (idx: number) => {
    setSlideIdx(idx);
    openLightbox();
  };

  if (images.length <= 0) return null;

  return (
    <div
      className={cn(className, GRID_COLS_CLASS, `image-grid mt-2 grid gap-1`)}
    >
      {images.slice(0, DISPLAY_IMAGES_NUM).map((img, idx) => {
        const { bmiddle } = getImageVariants(img);
        const hasMore =
          !!showHasMoreIndicator &&
          idx === MAX_DISPLAY_IMAGES - 1 &&
          REMAIN_IMAGES_NUM > 0;
        const dataProps = hasMore
          ? { 'data-remains': `+${REMAIN_IMAGES_NUM}` }
          : {};
        const className = cn(
          'border border-base-content/10 aspect-square h-full w-full cursor-zoom-in rounded shadow-sm',
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
              alt="IMG"
              src={FAKE_IMG || bmiddle}
              className="aspect-square !h-full !w-full rounded object-cover"
            />
          </div>
        );
      })}
      {renderLightbox({ slides, index: slideIdx })}
    </div>
  );
}
