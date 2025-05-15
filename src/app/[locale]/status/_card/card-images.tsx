/*
 * Weibo Status Images
 *
 * @Author: VenDream
 * @Date: 2023-11-28 14:08:43
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import ImageGrid from '@/components/common/image-grid';
import { getImageVariants } from '@/utils/weibo';
import { useCallback, useContext } from 'react';
import CardCtx from './context';

export default function CardIamges() {
  const { status } = useContext(CardCtx);
  const { images } = status as Weibo.Status;

  const getImageThumbnail = useCallback((img: string) => {
    return getImageVariants(img).bmiddle;
  }, []);

  const getImageSlide = useCallback((img: string) => {
    const variants = getImageVariants(img);
    return {
      src: variants.lg,
      download: variants.origin,
      filename: variants.filename,
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
