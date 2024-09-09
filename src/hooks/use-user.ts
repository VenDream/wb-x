/*
 * useUser
 *
 * @Author: VenDream
 * @Date: 2024-09-09 10:14:39
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { useUser as useClerkUser } from '@clerk/nextjs';

const isClerkEnabled = process.env.NEXT_PUBLIC_CLERK_ENABLED === 'true';

export default function useUser() {
  const { user } = useClerkUser();
  const isOrgAdmin = user?.organizationMemberships?.some(
    org => org.role === 'org:admin'
  );
  const isAdmin = !isClerkEnabled || isOrgAdmin;

  return { user, isAdmin };
}
