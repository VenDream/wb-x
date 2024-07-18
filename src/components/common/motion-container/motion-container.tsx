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

interface IProps extends React.PropsWithChildren {
  motion?: AnimationProps;
  className?: string;
}

export default function MotionContainer(props: IProps) {
  const { motion: motionProps = fadeInFromBottom, className, children } = props;

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
