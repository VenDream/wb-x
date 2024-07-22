/*
 * Motions
 *
 * @Author: VenDream
 * @Date: 2024-07-17 16:01:46
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { AnimationProps, TargetAndTransition } from 'framer-motion';

const DEFAULT_DURATION = 0.3;
const DEFAULT_EASE = 'easeOut';

export const fadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const fadeInFromBottom: AnimationProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE },
};

export const slideInFromBottom: TargetAndTransition = {
  y: -5,
  transition: { duration: 0.1, ease: DEFAULT_EASE },
};
