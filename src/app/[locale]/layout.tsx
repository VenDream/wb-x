/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Toaster from '@/components/common/toast';
import { Theme as ThemeProvider } from '@/components/daisyui';
import { LayoutBody, LayoutHeader } from '@/components/layout';
import { LANGS } from '@/contants';
import { font } from '@/fonts';
import { cn } from '@/utils/classnames';
import { enUS, zhCN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import './globals.scss';

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
    <ClerkProvider localization={locale === LANGS.en ? enUS : zhCN}>
      <html lang={locale} className={cn(font.className, 'rendering')}>
        <NextIntlClientProvider messages={messages}>
          <body className="flex h-screen min-w-[1280px] flex-col overflow-hidden">
            <ThemeProvider>
              <LayoutHeader />
              <LayoutBody>{children}</LayoutBody>
              <div className="loading-mask fixed flex h-full w-full items-center justify-center bg-white">
                <div className="loading loading-dots text-gray-500" />
              </div>
              <SpeedInsights />
              <Toaster font={font.className} />
            </ThemeProvider>
          </body>
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
