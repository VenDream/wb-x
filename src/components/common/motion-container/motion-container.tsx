/*
 * Motion container
 *
 * @Author: VenDream
 * @Date: 2024-07-18 10:41:41
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

'use client';

import { fadeInFromBottom } from '@/contants/motions';
import { AnimationProps, motion, MotionProps } from 'framer-motion';
import React from 'react';

interface IProps extends MotionProps {
  motion?: AnimationProps;
  disable?: boolean;
  className?: string;
}

const MotionContainer = React.forwardRef<HTMLDivElement, IProps>(
  (props: IProps, ref) => {
    const {
      motion: animation = fadeInFromBottom,
      disable = false,
      className,
      children,
      ...motionProps
    } = props;

    const animationProps = disable ? {} : animation;

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          translateZ: 0,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        {...animationProps}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

MotionContainer.displayName = 'MotionContainer';

export default MotionContainer;
