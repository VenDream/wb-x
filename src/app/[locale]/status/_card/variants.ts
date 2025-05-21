/*
 * Card Class Variants
 *
 * @Author: VenDream
 * @Date: 2023-11-24 10:30:21
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

/* -------------------------------------------------------------------------- */
/*                                Card Variants                               */
/* -------------------------------------------------------------------------- */

export type CardVariants = VariantProps<typeof card>;

export const card = cva(
  cn(
    'status-card p-4 relative rounded-box tracking-tight',
    'border border-base-content/10'
  ),
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

/* -------------------------------------------------------------------------- */
/*                              Comment Variants                              */
/* -------------------------------------------------------------------------- */

export type CommentVariants = VariantProps<typeof comment>;

export const comment = cva(cn('comment-item w-full relative group'), {
  variants: {
    type: {
      source: cn(''),
      reply: cn('rounded-md'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const commentBody = cva(cn('text-justify peer'), {
  variants: {
    type: {
      source: cn(
        'my-2',
        'grid',
        'grid-cols-[1fr_8fr]',
        'gap-0',
        'p-0',
        'text-sm'
      ),
      reply: cn('text-xs pr-20'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const commnetLikes = cva(cn('flex items-center text-xs absolute'), {
  variants: {
    type: {
      source: cn('top-[18px] right-2'),
      reply: cn('top-[2px] right-0 hidden peer-hover:flex'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});
