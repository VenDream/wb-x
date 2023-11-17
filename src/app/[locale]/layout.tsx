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
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = Object.values(LANGS);

export const metadata = {
  title: 'WB-X',
  description: 'The X makes it sound cool~',
};

export function generateStaticParams() {
  return locales.map(locale => ({
    locale,
  }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: ChildrenProps) {
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="flex h-screen min-w-[980px] flex-col">
          <ToastProvider>
            <LayoutHeader />
            <LayoutBody>{children}</LayoutBody>
          </ToastProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
