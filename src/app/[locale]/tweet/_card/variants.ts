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

/* -------------------------------------------------------------------------- */
/*                                Card Variants                               */
/* -------------------------------------------------------------------------- */

export type CardVariants = VariantProps<typeof card>;

export const card = cva(
  cn('p-4 border relative rounded-box  border-base-content/10'),
  {
    variants: {
      type: {
        source: cn('w-[40rem]', 'bg-base-200/30', 'shadow'),
        retweet: cn('w-full', 'bg-base-300/30', 'shadow-none'),
      },
    },
    defaultVariants: {
      type: 'source',
    },
  }
);

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
      source: cn('my-4 grid grid-cols-[1fr_8fr] gap-0 p-0'),
      retweet: cn('p-2'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});
