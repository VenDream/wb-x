'use client';

/*
 * Paginator
 *
 * @Author: VenDream
 * @Date: 2023-09-28 10:58:32
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import IPaginator, {
  type PaginatorProps as IPaginatorProps,
} from '@/components/common/paginator';
import { PRIMARY_ROUTES } from '@/constants';
import { useRouter } from '@/i18n/routing';

type PaginatorProps = Omit<IPaginatorProps, 'onCurrentPageChange'>;

export default function Paginator(props: PaginatorProps) {
  const router = useRouter();
  const { total, pageSize, defaultCurrent } = props;

  const routeTo = (page: number) => {
    const targetPage = `${PRIMARY_ROUTES.USER}/${page}`;
    router.push(targetPage);
  };

  return (
    <IPaginator
      total={total}
      pageSize={pageSize}
      defaultCurrent={defaultCurrent}
      onCurrentPageChange={routeTo}
    />
  );
}
