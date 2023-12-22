/*
 * Card Class Variants
 *
 * @Author: VenDream
 * @Date: 2023-11-24 10:30:21
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cva, VariantProps } from 'class-variance-authority';

/* -------------------------------------------------------------------------- */
/*                                Card Variants                               */
/* -------------------------------------------------------------------------- */

export type CardVariants = VariantProps<typeof card>;

export const card = cva(
  ['status-card', 'border-regular-10', 'rounded-md', 'p-4', 'relative'],
  {
    variants: {
      type: {
        default: ['w-[40rem]', 'bg-base-200/50', 'shadow-md'],
        retweet: ['w-full', 'bg-base-300/50', 'shadow-none'],
      },
    },
  }
);

export const cardBody = cva(['card-body', 'relative'], {
  variants: {
    type: {
      default: ['my-2', 'grid', 'grid-cols-[1fr,8fr]', 'gap-0', 'p-0'],
      retweet: ['p-2'],
    },
  },
});

export const cardFooter = cva(['card-footer', 'relative'], {
  variants: {
    type: {
      default: ['my-4', 'grid', 'grid-cols-[1fr,8fr]', 'gap-0', 'p-0'],
      retweet: ['p-2'],
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                              Comment Variants                              */
/* -------------------------------------------------------------------------- */

export type CommentVariants = VariantProps<typeof comment>;

export const comment = cva(['comment-item', 'w-full', 'relative', 'group'], {
  variants: {
    type: {
      default: [],
      reply: ['rounded-md'],
    },
  },
});

export const commentBody = cva(['comment-item-body', 'text-justify', 'peer'], {
  variants: {
    type: {
      default: [
        'my-2',
        'grid',
        'grid-cols-[1fr,8fr]',
        'gap-0',
        'p-0',
        'text-sm',
      ],
      reply: ['text-xs', 'pr-20'],
    },
  },
});

export const commnetLikes = cva(
  [
    'comment-item-likes',
    'flex',
    'items-center',
    'text-xs',
    'absolute',
    'tracking-tight',
  ],
  {
    variants: {
      type: {
        default: ['top-[18px]', 'right-2'],
        reply: ['top-[2px]', 'right-0', , 'hidden', 'peer-hover:flex'],
      },
    },
  }
);
