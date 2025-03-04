/*
 * Motion container
 *
 * @Author: VenDream
 * @Date: 2024-07-18 10:41:41
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

'use client';

import { fadeInFromBottom } from '@/constants/motions';
import {
  type AnimationProps,
  type HTMLMotionProps,
  motion,
} from 'framer-motion';
import React, { useState } from 'react';

interface IProps extends HTMLMotionProps<'div'> {
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

    const [willChange, setWillChange] = useState(false);

    const animationProps = disable ? {} : animation;

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          translateZ: 0,
          willChange: willChange ? 'transform' : 'auto',
          backfaceVisibility: 'hidden',
        }}
        {...animationProps}
        {...motionProps}
        onAnimationStart={(...args) => {
          setWillChange(true);
          props.onAnimationStart?.(...args);
        }}
        onAnimationComplete={(...args) => {
          setWillChange(false);
          props.onAnimationComplete?.(...args);
        }}
      >
        {children}
      </motion.div>
    );
  }
);

MotionContainer.displayName = 'MotionContainer';

export default MotionContainer;
