/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getTrackingUsers } from '@/api/server';
import Toaster from '@/components/common/toast';
import { LayoutBody, LayoutHeader } from '@/components/layout';
import { LANGS, META_DATA } from '@/contants';
import { font } from '@/fonts';
import { routing } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { enUS, zhCN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RenderingBoundary } from 'jotai-ssr';
import { LoaderCircleIcon } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Provider from './provider';

import './globals.scss';

export const metadata = META_DATA;

export default async function RootLayout({ children, params }: ChildrenProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  let trackingUsers: string[] = [];
  try {
    const { userIds } = await getTrackingUsers();
    userIds && trackingUsers.push(...userIds);
  } catch (err) {
    console.error('failed to fetch tracking users', err);
  }

  return (
    <ClerkProvider localization={locale === LANGS.en ? enUS : zhCN}>
      <html lang={locale} className={cn(font.className, 'preparing')}>
        <NextIntlClientProvider messages={messages}>
          <body className="flex h-screen min-w-[1280px] flex-col overflow-hidden">
            <RenderingBoundary performanceImpactingUseUpperStore>
              <Provider trackingUsers={trackingUsers}>
                <LayoutHeader />
                <LayoutBody>{children}</LayoutBody>
                <SpeedInsights />
                <Toaster font={font.className} />
              </Provider>
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
            </RenderingBoundary>
          </body>
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
