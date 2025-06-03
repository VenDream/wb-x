/*
 * Twitter Tweet Images
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:20:51
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import MediaGrid, { type ImageItem } from '@/components/common/media-grid';
import { getImageVariants } from '@/utils/twitter';
import { useContext, useMemo } from 'react';
import { CardCtx } from './context';

export default function CardIamges() {
  const { tweet, isComment } = useContext(CardCtx);
  const { images } = tweet as Twitter.Tweet;

  const imageItems = useMemo(
    () =>
      images.map<ImageItem>(image => {
        const { filename, origin, sm, lg } = getImageVariants(image);
        return {
          type: 'image',
          src: lg,
          filename,
          download: origin,
          thumbnail: sm,
        };
      }),
    [images]
  );

  return (
    <MediaGrid
      cols={isComment ? 4 : 3}
      items={imageItems}
      showHasMoreIndicator
    />
  );
}
