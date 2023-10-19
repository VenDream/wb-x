'use client';

/*
 * Common Image Component
 *
 * @Author: VenDream
 * @Date: 2023-10-19 15:02:01
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { IMG_ERROR_PLACEHOLDER, IMG_PLACEHOLDER } from '@/contants';
import NextImage from 'next/image';
import { useState } from 'react';

type NextImageProps = NonNullable<Parameters<typeof NextImage>[0]>;

export default function Image(props: NextImageProps) {
  const { src, placeholder, ...restProps } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NextImage
      {...restProps}
      src={imgSrc}
      placeholder={placeholder || IMG_PLACEHOLDER}
      onError={() => setImgSrc(IMG_ERROR_PLACEHOLDER)}
    />
  );
}
