/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import './globals.scss';

import { LayoutBody, LayoutHeader } from '@/components/layout';

export const metadata = {
  title: 'wb-x',
  description: 'wb-x app',
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <LayoutHeader></LayoutHeader>
        <LayoutBody>{children}</LayoutBody>
      </body>
    </html>
  );
}
