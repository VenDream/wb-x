/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { LayoutBody, LayoutHeader } from '@/components/layout';

import './globals.scss';

export const metadata = {
  title: 'wb-x',
  description: 'wb-x app',
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <LayoutBody>
          <LayoutHeader></LayoutHeader>
          {children}
        </LayoutBody>
      </body>
    </html>
  );
}
