/*
 * Weibo Status Images
 *
 * @Author: VenDream
 * @Date: 2023-11-28 14:08:43
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import MediaGrid, { type ImageItem } from '@/components/common/media-grid';
import { getImageVariants } from '@/utils/weibo';
import { useContext, useMemo } from 'react';
import CardCtx from './context';

export default function CardIamges() {
  const { status } = useContext(CardCtx);
  const { images } = status as Weibo.Status;

  const imageItems = useMemo(
    () =>
      images.map<ImageItem>(image => {
        const { filename, origin, bmiddle, lg } = getImageVariants(image);
        return {
          type: 'image',
          src: lg,
          filename,
          download: origin,
          thumbnail: bmiddle,
        };
      }),
    [images]
  );

  return <MediaGrid cols={3} items={imageItems} showHasMoreIndicator />;
}
