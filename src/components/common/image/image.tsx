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
import { fadeOut } from '@/contants/motions';
import { AnimatePresence, motion } from 'framer-motion';
import NextImage from 'next/image';
import { useState } from 'react';

type NextImageProps = NonNullable<Parameters<typeof NextImage>[0]> & {};

export default function CommonImage(props: NextImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const imageProps: NextImageProps = {
    ...props,
    fill: props.fill || true,
    width: props.width || 0,
    height: props.height || 0,
    loading: props.loading || 'lazy',
    objectFit: props.objectFit || 'cover',
  };

  return (
    <>
      <NextImage
        {...imageProps}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsFailed(true)}
      />
      <AnimatePresence>
        {!isLoaded && (
          <motion.img
            {...fadeOut}
            alt="MASK"
            src={isFailed ? IMG_ERROR_PLACEHOLDER : IMG_PLACEHOLDER}
            className="absolute inset-0 h-full w-full rounded-[inherit] object-fill"
          />
        )}
      </AnimatePresence>
    </>
  );
}
