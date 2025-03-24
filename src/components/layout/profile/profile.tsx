'use client';

/*
 * User Profile
 *
 * @Author: VenDream
 * @Date: 2024-04-07 14:06:18
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import useIsDarkTheme from '@/hooks/use-is-dark-theme';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';

const isClerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true';

export default function Profile() {
  const isDark = useIsDarkTheme();

  if (!isClerkEnabled) return null;

  return (
    <SignedIn>
      <UserButton
        appearance={{ baseTheme: isDark ? shadesOfPurple : undefined }}
      />
    </SignedIn>
  );
}
