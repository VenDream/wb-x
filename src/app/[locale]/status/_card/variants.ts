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

export const card = cva(cn('status-card relative border-base-content/10'), {
  variants: {
    type: {
      source: cn(
        'w-dvw lg:w-[40rem] bg-base-200/30 lg:shadow p-4 lg:p-6',
        'border-b lg:border rounded-none lg:rounded-box'
      ),
      retweet: cn(
        'w-full bg-base-300/30 shadow-none p-2 lg:p-4 border rounded-box'
      ),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const cardHeader = cva(cn('flex items-center'), {
  variants: {
    type: {
      source: cn('gap-3 lg:gap-4'),
      retweet: cn('gap-2 p-2'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const cardBody = cva(cn('relative flex p-0 w-full'), {
  variants: {
    type: {
      source: cn('pl-11 lg:pl-14 mt-2 lg:mt-4'),
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
      source: cn('pl-11 lg:pl-14 mt-4 lg:mt-4'),
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
      source: cn(
        'p-4 border-b lg:border lg:border-t-0 border-base-content/10',
        'bg-base-200/30'
      ),
      reply: cn('rounded-md'),
      detailReplies: cn(''),
    },
    mode: {
      dialog: cn('px-0 pb-2 bg-transparent'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const commentBody = cva(cn('text-justify peer flex w-full'), {
  variants: {
    type: {
      source: cn('my-2 text-sm pl-11 lg:pl-14'),
      reply: cn('text-xs pl-0 lg:pr-20'),
      detailReplies: cn('my-2 text-sm pl-0'),
    },
    mode: {
      dialog: cn('pl-12'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});

export const commnetLikes = cva(cn('flex items-center text-xs absolute'), {
  variants: {
    type: {
      source: cn('top-[18px] right-6'),
      reply: cn('top-[2px] right-0 hidden peer-hover:flex'),
      detailReplies: cn('top-[7px] lg:top-[12px] right-1'),
    },
    mode: {
      dialog: cn('first:top-0 !right-0'),
    },
  },
  defaultVariants: {
    type: 'source',
  },
});
