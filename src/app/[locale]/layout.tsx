/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { DialogProvider } from '@/components/common/dialog';
import Toaster from '@/components/common/toast';
import { Theme as ThemeProvider } from '@/components/daisyui';
import { LayoutBody, LayoutHeader } from '@/components/layout';
import { LANGS, META_DATA } from '@/contants';
import { font } from '@/fonts';
import { cn } from '@/utils/classnames';
import { enUS, zhCN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LoaderCircleIcon } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import './globals.scss';

const locales = Object.values(LANGS);
export const metadata = META_DATA;

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
      <html lang={locale} className={cn(font.className, 'preparing')}>
        <NextIntlClientProvider messages={messages}>
          <body className="flex h-screen min-w-[1280px] flex-col overflow-hidden">
            <ThemeProvider>
              <DialogProvider>
                <LayoutHeader />
                <LayoutBody>{children}</LayoutBody>
                <SpeedInsights />
                <Toaster font={font.className} />
              </DialogProvider>
            </ThemeProvider>
            <div
              className={cn(
                'loading-mask fixed z-50 flex h-screen w-screen items-center',
                'justify-center gap-2 bg-base-100/50 backdrop-blur-lg'
              )}
            >
              <LoaderCircleIcon
                size={30}
                className="animate-spin text-base-content"
              />
            </div>
          </body>
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
