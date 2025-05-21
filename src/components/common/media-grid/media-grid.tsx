/*
 * Image/Video Grid
 *
 * @Author: VenDream
 * @Date: 2023-12-15 15:57:51
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { type Slide, useLightbox } from '@/components/common/lightbox';
import { Badge } from '@/components/daisyui';
import { PlayIcon } from '@/components/icons';
import { FAKE_IMG, FAKE_POSTER, FAKE_VIDEO } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import { getFileName } from '@/utils/common';
import { getVideoDuration } from '@/utils/datetime';
import { useMemo, useState } from 'react';
import type { ImageItem, MediaGridProps, VideoItem } from './types';

import './media-grid.css';

export default function MediaGrid(props: MediaGridProps) {
  const { items, className, cols = 3, showHasMoreIndicator } = props;
  const { openLightbox, renderLightbox } = useLightbox();

  const [slideIdx, setSlideIdx] = useState(0);
  const slides = useMemo<Slide[]>(() => {
    return items.map((item, idx) => {
      const filename = item.filename || getFileName(item.src);
      const title = (
        <p key={idx} className="h-[2rem] text-sm leading-[2rem] font-normal">
          {idx + 1} / {items.length} - {filename}
        </p>
      );

      if (item.type === 'image') {
        return {
          type: 'image',
          title,
          src: FAKE_IMG(idx) || item.src,
          thumbnail: FAKE_IMG(idx) || item.thumbnail,
          download: item.download,
        };
      }

      return {
        type: 'video',
        title,
        poster: FAKE_POSTER || item.poster,
        width: item.aspectRatio[0],
        height: item.aspectRatio[1],
        download: item.download,
        sources: [
          {
            src: FAKE_VIDEO || item.src,
            type: 'video/mp4',
          },
        ],
      };
    });
  }, [items]);

  const MAX_DISPLAY_IMAGES = cols ** 2;
  const REMAIN_IMAGES_NUM = items.length - MAX_DISPLAY_IMAGES;
  const DISPLAY_IMAGES_NUM = showHasMoreIndicator
    ? MAX_DISPLAY_IMAGES
    : items.length;

  const previewMedia = (idx: number) => {
    setSlideIdx(idx);
    openLightbox();
  };

  if (items.length <= 0) return null;

  return (
    <div
      className={cn(
        'media-grid grid gap-1',
        {
          'grid-cols-2': cols === 2,
          'grid-cols-3': cols === 3,
          'grid-cols-4': cols === 4,
          'grid-cols-5': cols === 5,
        },
        className
      )}
    >
      {items.slice(0, DISPLAY_IMAGES_NUM).map((item, idx) => {
        const imageItem = item as ImageItem;
        const videoItem = item as VideoItem;
        const isImage = item.type === 'image';
        const isVideo = item.type === 'video';

        const thumbnail = imageItem.thumbnail || videoItem.poster;
        const duration = isVideo ? getVideoDuration(videoItem.duration) : null;

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
              'relative rounded-sm shadow-xs',
              'border-base-content/10 aspect-square h-full w-full border',
              {
                'has-more': hasMore,
                'cursor-zoom-in': isImage,
                'cursor-pointer': isVideo,
              }
            )}
            onClick={() => previewMedia(idx)}
          >
            <Image
              alt="IMG"
              src={FAKE_IMG(idx) || thumbnail}
              className="aspect-square !h-full !w-full rounded-sm object-cover"
            />
            {isVideo && (
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'backdrop-blur-4xs rounded-sm bg-black/30'
                )}
              >
                <PlayIcon size={50} className="text-white/80" />
                <Badge
                  size="sm"
                  className={cn(
                    'absolute bottom-2 left-2 backdrop-blur-lg',
                    'border-black/50 bg-black/50 text-white'
                  )}
                >
                  {duration}
                </Badge>
              </div>
            )}
          </div>
        );
      })}
      {renderLightbox({ slides, index: slideIdx })}
    </div>
  );
}
