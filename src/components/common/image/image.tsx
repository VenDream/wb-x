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
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

type NextImageProps = NonNullable<Parameters<typeof NextImage>[0]> & {
  /**
   * auto detect image size
   * - only works when `fill` is false
   */
  autoSize?: boolean;
};

interface ImageSize {
  width: number;
  height: number;
}

export default function CommonImage(props: NextImageProps) {
  const {
    src,
    autoSize,
    placeholder = IMG_PLACEHOLDER,
    width,
    height,
    loading = 'eager',
    ...restProps
  } = props;

  const [imgSrc, setImgSrc] = useState<string | StaticImport>(placeholder);
  const [imgSize, setImgSize] = useState<ImageSize>({
    width: (width as number) || 0,
    height: (height as number) || 0,
  });

  useEffect(() => {
    if (
      restProps.fill ||
      !autoSize ||
      typeof imgSize.width !== 'number' ||
      typeof imgSize.height !== 'number'
    ) {
      setImgSrc(IMG_PLACEHOLDER || src);
      return;
    }

    const detect = async () => {
      try {
        const { width, height } = await getMeta(src as string);
        const ratio = width / height;
        setImgSize(({ width: w, height: h }) => ({
          width: w || (h ? h * ratio : width),
          height: h || (w ? w / ratio : height),
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setImgSrc(IMG_PLACEHOLDER || (src as string));
      }
    };

    detect();
  }, [autoSize, imgSize, restProps.fill, src]);

  const isPlaceholder = imgSrc === IMG_PLACEHOLDER;

  return (
    <NextImage
      {...restProps}
      {...imgSize}
      src={imgSrc}
      loading={loading}
      placeholder={isPlaceholder ? 'empty' : placeholder}
      onError={() => setImgSrc(IMG_ERROR_PLACEHOLDER)}
    />
  );
}

const getMeta = (url: string) =>
  new Promise<ImageSize>((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = err => reject(err);
    img.src = url;
  });
