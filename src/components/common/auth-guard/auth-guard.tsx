/*
 * Auth Guard
 *
 * @Author: VenDream
 * @Date: 2024-10-29 14:49:57
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import NoPermission from '@/app/[locale]/settings/no-permission';
import Loading from '@/components/common/loading';
import useUser from '@/hooks/use-user';
import type React from 'react';

interface IProps extends React.PropsWithChildren {
  loading?: boolean;
  fallback?: React.ReactNode;
  noPermissionClassName?: string;
}

export default function AuthGuard(props: IProps) {
  const { isInited, isAdmin } = useUser();

  if (!isInited) return props.loading === false ? null : <Loading />;

  const fallback =
    props.fallback !== undefined ? (
      props.fallback
    ) : (
      <NoPermission className={props.noPermissionClassName} />
    );

  return isAdmin ? props.children : fallback;
}
