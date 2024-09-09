/*
 * Global Provider Wrapper
 *
 * @Author: VenDream
 * @Date: 2024-09-09 15:08:04
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { DialogProvider } from '@/components/common/dialog';
import { Theme as ThemeProvider } from '@/components/daisyui';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

export default function Provider({ children }: ChildrenProps) {
  return (
    <ThemeProvider className="wbx-theme-provoder">
      <TooltipProvider>
        <DialogProvider>{children}</DialogProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
