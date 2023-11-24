/*
 * Card Class Variants
 *
 * @Author: VenDream
 * @Date: 2023-11-24 10:30:21
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cva } from 'class-variance-authority';

export const card = cva(
  [
    'status-card',
    'border-regular-10',
    'rounded-md',
    'p-4',
    'relative',
    'overflow-hidden',
  ],
  {
    variants: {
      type: {
        default: ['w-[40rem]', 'bg-base-100', 'shadow'],
        retweet: ['w-full', 'bg-base-200', 'shadow-none'],
      },
    },
  }
);
