/*
 * Server Provider
 *
 * @Author: VenDream
 * @Date: 2024-09-09 15:08:04
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { DialogProvider } from '@/components/common/dialog';
import { Theme as ThemeProvider } from '@/components/daisyui';
import { JotaiProvider } from '@/store/provider';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

export default function Provider({
  children,
  trackingUsers,
}: ChildrenProps<App.StoreState>) {
  return (
    <JotaiProvider initialState={{ trackingUsers }}>
      <ThemeProvider className="wbx-theme-provoder">
        <TooltipProvider>
          <DialogProvider>{children}</DialogProvider>
        </TooltipProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
}
