/*
 * Weibo Status Images
 *
 * @Author: VenDream
 * @Date: 2023-11-28 14:08:43
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import ImageGrid from '@/components/common/image-grid';
import { useContext } from 'react';
import CardCtx from './context';

export default function CardIamges() {
  const { status } = useContext(CardCtx);
  const { images } = status!;

  return (
    <ImageGrid
      cols={3}
      isSinaImg
      images={images}
      showHasMoreIndicator
      className="status-images"
    />
  );
}
