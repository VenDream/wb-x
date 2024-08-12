/*
 * Motions
 *
 * @Author: VenDream
 * @Date: 2024-07-17 16:01:46
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { AnimationProps, TargetAndTransition } from 'framer-motion';

export const DEFAULT_DURATION = 0.3;
export const DEFAULT_EASE = 'easeOut';
export const DEFAULT_EASE_CSS = 'ease-out';

export const fadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const fadeOut: AnimationProps = {
  initial: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const fadeInFromBottom: AnimationProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const moveUp: TargetAndTransition = {
  y: -5,
  transition: { duration: 0.1, ease: DEFAULT_EASE },
};
