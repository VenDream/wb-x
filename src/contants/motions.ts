/*
 * Motions
 *
 * @Author: VenDream
 * @Date: 2024-07-17 16:01:46
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { AnimationProps } from 'framer-motion';

export const fadeInFromBottom: AnimationProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};
