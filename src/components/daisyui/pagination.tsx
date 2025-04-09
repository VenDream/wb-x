/*
 * DaisyUI Pagination
 *
 * @Author: VenDream
 * @Date: 2025-03-12 10:20:52
 *
 * @refer: https://daisyui.com/components/pagination
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import Button, { type ButtonProps } from './button';

export interface PaginationProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

type PaginationItemProps = ButtonProps;

function Pagination(props: PaginationProps) {
  const { children, className, ...divProps } = props;

  const daisyUIClasses = cn('join', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function PaginationItem(props: PaginationItemProps) {
  const { children, className, ...btnProps } = props;

  const daisyUIClasses = cn('join-item', className);

  return (
    <Button className={daisyUIClasses} {...btnProps}>
      {children}
    </Button>
  );
}

Pagination.displayName = 'Pagination';
PaginationItem.displayName = 'PaginationItem';

export default Object.assign(Pagination, {
  Item: PaginationItem,
});
