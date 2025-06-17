/*
 * Motions
 *
 * @Author: VenDream
 * @Date: 2024-07-17 16:01:46
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { camel2Kebab } from '@/utils/common';
import type { MotionProps, TargetAndTransition } from 'framer-motion';

export const DEFAULT_DURATION = 0.2;
export const DEFAULT_EASE = 'easeOut';
export const DEFAULT_EASE_CSS = camel2Kebab(DEFAULT_EASE);
export const DEFAULT_SPRING: MotionProps['transition'] = {
  type: 'spring',
  mass: 0.2,
  damping: 8,
  stiffness: 150,
};

/* -------------------------------------------------------------------------- */
/*                                   Common                                   */
/* -------------------------------------------------------------------------- */

export const fadeIn: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const fadeOut: MotionProps = {
  initial: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const fadeInFromBottom: MotionProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const moveUp: TargetAndTransition = {
  y: -5,
  transition: { duration: 0.1, ease: DEFAULT_EASE },
};

/* -------------------------------------------------------------------------- */
/*                               Favourite Btns                               */
/* -------------------------------------------------------------------------- */

export const favouriteBtnMotion: MotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: 'spring',
    duration: DEFAULT_DURATION,
    mass: 0.4,
    damping: 5,
  },
};

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */

export const dialogMotion: MotionProps = {
  variants: {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.8 },
  },
  initial: 'closed',
  animate: 'open',
  exit: 'closed',
  transition: DEFAULT_SPRING,
};

export const dialogMaskMotion: MotionProps = {
  variants: {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  },
  initial: 'closed',
  animate: 'open',
  exit: 'closed',
  transition: DEFAULT_SPRING,
};
