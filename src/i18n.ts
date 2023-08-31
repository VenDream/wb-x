/*
 * i18n for server components
 *
 * @Author: VenDream
 * @Date: 2023-08-29 14:05:49
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }: { locale: string }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
