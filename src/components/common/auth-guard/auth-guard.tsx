/*
 * Auth Guard
 *
 * @Author: VenDream
 * @Date: 2024-10-29 14:49:57
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import NoPermission from '@/app/[locale]/settings/no-permission';
import useUser from '@/hooks/use-user';
import React from 'react';

export default function AuthGuard(props: React.PropsWithChildren) {
  const { isAdmin } = useUser();
  return isAdmin ? props.children : <NoPermission />;
}
