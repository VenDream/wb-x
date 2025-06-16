/*
 * Card Class Variants
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:11:24
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export type CardVariants = VariantProps<typeof card>;

export const card = cva(cn('p-4 relative'), {
  variants: {
    type: {
      source: cn('w-[40rem]', 'bg-base-200/30', 'shadow-xs'),
      retweet: cn('w-full', 'bg-base-300/30', 'shadow-none'),
    },
    displayAs: {
      tweet: cn('border relative rounded-box border-base-content/10'),
      comment: null,
    },
  },
  compoundVariants: [
    {
      type: 'source',
      displayAs: 'comment',
      className: cn('bg-transparent shadow-none'),
    },
    {
      type: 'retweet',
      displayAs: 'comment',
      className: cn('bg-transparent shadow-none'),
    },
  ],
  defaultVariants: {
    type: 'source',
    displayAs: 'tweet',
  },
});

export const cardBody = cva(cn('card-body relative'), {
  variants: {
    type: {
      source: cn('my-2 grid grid-cols-[1fr_8fr] gap-0 p-0'),
      retweet: cn('p-2'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const cardFooter = cva(cn('relative'), {
  variants: {
    type: {
      source: cn('grid grid-cols-[1fr_8fr] gap-0 p-0'),
      retweet: cn('p-2'),
    },
    displayAs: {
      tweet: cn('my-4'),
      comment: cn('mt-4'),
    },
  },
  defaultVariants: {
    type: 'source',
    displayAs: 'tweet',
  },
});
