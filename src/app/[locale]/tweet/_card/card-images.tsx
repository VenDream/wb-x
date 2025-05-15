/*
 * Twitter Tweet Images
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:20:51
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import ImageGrid from '@/components/common/image-grid';
import { getImageVariants } from '@/utils/twitter';
import { useCallback, useContext } from 'react';
import CardCtx from './context';

export default function CardIamges() {
  const { tweet } = useContext(CardCtx);
  const { images } = tweet as Twitter.Tweet;

  const getImageThumbnail = useCallback((img: string) => {
    return getImageVariants(img).md;
  }, []);

  const getImageSlide = useCallback((img: string) => {
    const variants = getImageVariants(img);
    return {
      src: variants.lg,
      download: variants.origin,
    };
  }, []);

  return (
    <ImageGrid
      cols={3}
      images={images}
      showHasMoreIndicator
      getImageSlide={getImageSlide}
      getImageThumbnail={getImageThumbnail}
    />
  );
}
