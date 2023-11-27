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
        default: ['w-[40rem]', 'bg-base-100', 'shadow-md'],
        retweet: ['w-full', 'bg-base-200', 'shadow-none'],
      },
    },
  }
);

export const cardBody = cva(['card-body'], {
  variants: {
    type: {
      default: ['my-2', 'grid', 'grid-cols-[0.9fr,1.8fr,5fr]', 'gap-0', 'p-0'],
      retweet: ['p-2', 'pr-4'],
    },
  },
});

export const cardFooter = cva(['card-footer'], {
  variants: {
    type: {
      default: ['my-4', 'grid', 'grid-cols-[0.9fr,1.8fr,5fr]', 'gap-0', 'p-0'],
      retweet: ['p-2'],
    },
  },
});
