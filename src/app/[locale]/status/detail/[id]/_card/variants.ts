/*
 * Card Class Variants
 *
 * @Author: VenDream
 * @Date: 2023-11-24 10:30:21
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { cva } from 'class-variance-authority';

/* -------------------------------------------------------------------------- */
/*                                Card Variants                               */
/* -------------------------------------------------------------------------- */

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

export const comment = cva(['comment-item', 'w-full'], {
  variants: {
    type: {
      default: [],
      reply: ['bg-base-300/50'],
    },
  },
});

export const commentBody = cva(['item-body'], {
  variants: {
    type: {
      default: ['my-2', 'grid', 'grid-cols-[1fr,8fr]', 'gap-0', 'p-0'],
      reply: ['p-2'],
    },
  },
});
