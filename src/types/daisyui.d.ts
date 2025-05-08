/*
 * DaisyUI Types
 *
 * @Author: VenDream
 * @Date: 2025-05-08 16:55:05
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import type { DARK_THEMES, THEMES } from '@/constants';

declare global {
  namespace DaisyUI {
    type Theme = (typeof THEMES)[number];
    type DarkTheme = (typeof DARK_THEMES)[number];

    interface Style {
      outline?: boolean;
      dash?: boolean;
      soft?: boolean;
      ghost?: boolean;
      link?: boolean;
    }

    type Color =
      | 'neutral'
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'info'
      | 'success'
      | 'warning'
      | 'error';

    type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }
}
