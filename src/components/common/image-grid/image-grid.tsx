/*
 * Image Grid
 *
 * @Author: VenDream
 * @Date: 2023-12-15 15:57:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { type Slide, useLightbox } from '@/components/common/lightbox';
import { FAKE_IMG } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import { getFileName } from '@/utils/common';
import { getImageVariants } from '@/utils/weibo';
import { useMemo, useState } from 'react';

import './image-grid.css';

interface ImageGridProps {
  images: string[];
  cols?: 2 | 3 | 4 | 5;
  className?: string;
  isSinaImg?: boolean;
  showHasMoreIndicator?: boolean;
}

export default function ImageGrid(props: ImageGridProps) {
  const {
    images,
    className,
    cols = 3,
    isSinaImg,
    showHasMoreIndicator,
  } = props;
  const { openLightbox, renderLightbox } = useLightbox();

  const [slideIdx, setSlideIdx] = useState(0);
  const slides = useMemo<Slide[]>(() => {
    return images.map((img, idx) => {
      let src = img;
      let download = img;
      let filename = getFileName(img);

      if (isSinaImg) {
        const { lg, origin, filename: fn } = getImageVariants(img);
        src = lg;
        download = origin;
        filename = fn || filename;
      }

      return {
        type: 'image',
        src: FAKE_IMG(idx) || src,
        title: (
          <p className="h-[2rem] text-sm leading-[2rem] font-normal">
            {idx + 1} / {images.length} - {filename}
          </p>
        ),
        download,
      };
    });
  }, [images, isSinaImg]);

  const MAX_DISPLAY_IMAGES = cols ** 2;
  const REMAIN_IMAGES_NUM = images.length - MAX_DISPLAY_IMAGES;
  const DISPLAY_IMAGES_NUM = showHasMoreIndicator
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
    <div className={cn('image-grid grid gap-1', className, GRID_COLS_CLASS)}>
      {images.slice(0, DISPLAY_IMAGES_NUM).map((img, idx) => {
        let thumbnail = img;
        if (isSinaImg) {
          thumbnail = getImageVariants(img).bmiddle;
        }

        const hasMore =
          !!showHasMoreIndicator &&
          idx === MAX_DISPLAY_IMAGES - 1 &&
          REMAIN_IMAGES_NUM > 0;

        const dataProps = hasMore
          ? { 'data-remains': `+${REMAIN_IMAGES_NUM}` }
          : {};

        return (
          <div
            key={idx}
            {...dataProps}
            className={cn(
              'border-base-content/10 aspect-square h-full w-full border',
              'relative cursor-zoom-in rounded-sm shadow-xs',
              {
                'has-more': hasMore,
              }
            )}
            onClick={() => previewImages(idx)}
          >
            <Image
              alt="IMG"
              src={FAKE_IMG(idx) || thumbnail}
              className="aspect-square !h-full !w-full rounded-sm object-cover"
            />
          </div>
        );
      })}
      {renderLightbox({ slides, index: slideIdx })}
    </div>
  );
}
