'use client';

import { LS_KEYS } from '@/contants';
import { isDarkTheme } from '@/utils/theme';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';
import { useCallback, useEffect, useState } from 'react';

const isClerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true';

/*
 * User Profile
 *
 * @Author: VenDream
 * @Date: 2024-04-07 14:06:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

export default function Profile() {
  const [isDark, setIsDark] = useState(false);

  const checkDarkTheme = useCallback(() => {
    const isDark = isDarkTheme();
    setIsDark(isDark);
  }, []);

  const onThemeChange = useCallback(
    (evt: StorageEvent) => {
      if (evt?.key !== LS_KEYS.THEME) return;
      checkDarkTheme();
    },
    [checkDarkTheme]
  );

  useEffect(() => {
    checkDarkTheme();
    window.addEventListener('storage', onThemeChange);
    return () => {
      window.removeEventListener('storage', onThemeChange);
    };
  }, [checkDarkTheme, onThemeChange]);

  if (!isClerkEnabled) return null;

  return (
    <SignedIn>
      <UserButton
        appearance={{ baseTheme: isDark ? shadesOfPurple : undefined }}
      />
    </SignedIn>
  );
}
