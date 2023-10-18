/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import './globals.scss';

import { ToastProvider } from '@/components/common/toast';
import { LayoutBody, LayoutHeader } from '@/components/layout';
import { LANGS } from '@/contants';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'WB-X',
  description: 'The X makes it sound cool~',
};

export function generateStaticParams() {
  return Object.values(LANGS).map(locale => ({
    locale,
  }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: ChildrenProps) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="flex h-screen min-w-[980px] flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider>
            <LayoutHeader />
            <LayoutBody>{children}</LayoutBody>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
