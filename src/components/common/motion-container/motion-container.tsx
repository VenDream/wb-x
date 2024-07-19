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
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';

interface IProps extends React.PropsWithChildren {
  motion?: AnimationProps;
  className?: string;
}

const MotionContainer = React.forwardRef<HTMLDivElement, IProps>(
  (props: IProps, ref) => {
    const {
      motion: motionProps = fadeInFromBottom,
      className,
      children,
    } = props;

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          translateZ: 0,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

MotionContainer.displayName = 'MotionContainer';

export default MotionContainer;
