'use client';

/*
 * Common Image Component
 *
 * @Author: VenDream
 * @Date: 2023-10-19 15:02:01
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { IMG_ERROR_PLACEHOLDER, IMG_PLACEHOLDER } from '@/constants';
import {
  DEFAULT_DURATION,
  DEFAULT_EASE_CSS,
  fadeIn,
  fadeOut,
} from '@/constants/motions';
import { AnimatePresence, motion } from 'framer-motion';
import NextImage from 'next/image';
import { useRef, useState } from 'react';

type NextImageProps = NonNullable<Parameters<typeof NextImage>[0]> & {};

export default function CommonImage(props: NextImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const isFailedRef = useRef(false);

  const [showSucc, setShowSucc] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const imageProps: NextImageProps = {
    ...props,
    fill: props.fill || true,
    width: props.width || 0,
    height: props.height || 0,
    loading: props.loading || 'lazy',
  };

  return (
    <>
      <NextImage
        {...imageProps}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsFailed(true);
          isFailedRef.current = true;
        }}
        style={{
          ...imageProps.style,
          opacity: showSucc ? 1 : 0,
          objectFit: imageProps.style?.objectFit || 'cover',
          transition: `opacity ${DEFAULT_DURATION}s ${DEFAULT_EASE_CSS}`,
        }}
      />
      {isFailed && showFailed && (
        <motion.img
          {...fadeIn}
          alt="LOAD_ERROR"
          src={IMG_ERROR_PLACEHOLDER}
          className="absolute inset-0 h-full w-full rounded-[inherit] object-fill"
        />
      )}
      <AnimatePresence>
        {!isLoaded && !isFailed && (
          <motion.img
            {...fadeOut}
            alt="PRELOAD"
            src={IMG_PLACEHOLDER}
            onAnimationComplete={() => {
              if (isFailedRef.current) {
                setShowFailed(true);
              } else {
                setShowSucc(true);
              }
            }}
            className="absolute inset-0 h-full w-full rounded-[inherit] object-fill"
          />
        )}
      </AnimatePresence>
    </>
  );
}
