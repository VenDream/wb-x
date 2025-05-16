/*
 * Root Layout
 *
 * @Author: VenDream
 * @Date: 2023-05-31 19:09:41
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Loading from '@/components/common/loading';
import Toaster from '@/components/common/toast';
import { LayoutBody, LayoutHeader } from '@/components/layout';
import { LANGS, META_DATA } from '@/constants';
import { font } from '@/fonts';
import { routing } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { enUS, zhCN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProxyAgent, setGlobalDispatcher } from 'undici';
import Provider from './provider';

import './global.css';

export const metadata = META_DATA;

if (process.env.LOCAL_PROXY_ENABLED === 'true') {
  const proxyUrl = process.env.LOCAL_PROXY_URL as string;
  const proxyAgent = new ProxyAgent(proxyUrl);
  setGlobalDispatcher(proxyAgent);
  console.log('[undici] using local proxy: %s', proxyUrl);
}

export default async function RootLayout({ children, params }: ChildrenProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const t = await getTranslations('global.layout');

  return (
    <ClerkProvider localization={locale === LANGS.en ? enUS : zhCN}>
      <html lang={locale} className={font.className}>
        <NextIntlClientProvider messages={messages}>
          <body className="flex h-screen min-w-[1280px] flex-col overflow-hidden">
            <Provider>
              <LayoutHeader />
              <LayoutBody>{children}</LayoutBody>
              <SpeedInsights />
              <Toaster font={font.className} />
            </Provider>
            <div
              data-role="loading-mask"
              className={cn(
                'fixed inset-0 z-50 flex items-center justify-center',
                'bg-base-100/80 backdrop-blur-lg'
              )}
            >
              <Loading size={24} text={t('loading')} />
            </div>
          </body>
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
