/*
 * DaisyUI Dropdown
 *
 * @Author: VenDream
 * @Date: 2025-03-07 10:04:14
 *
 * @refer: https://daisyui.com/components/dropdown
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { forwardRef } from 'react';

export interface DropdownProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  trigger?: 'click' | 'hover';
  align?: 'start' | 'center' | 'end';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface DropdownToggleProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export interface DropdownMenuProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLUListElement> {}

export interface DropdownItemProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLLIElement> {}

function Dropdown(props: DropdownProps) {
  const { open, trigger, align, placement, className, children, ...divProps } =
    props;

  const daisyUIClasses = cn(
    {
      dropdown: true,
      'dropdown-open': open,
      'dropdown-hover': trigger === 'hover',
      'dropdown-start': align === 'start',
      'dropdown-center': align === 'center',
      'dropdown-end': align === 'end',
      'dropdown-top': placement === 'top',
      'dropdown-bottom': placement === 'bottom',
      'dropdown-left': placement === 'left',
      'dropdown-right': placement === 'right',
    },
    className
  );

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

const DropdownToggle = forwardRef<HTMLDivElement, DropdownToggleProps>(
  (props, ref) => {
    const { className, children, disabled, ...divProps } = props;

    return (
      <div
        tabIndex={0}
        ref={ref}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="button"
        className={cn(className, { 'pointer-events-none': disabled })}
        {...divProps}
      >
        {children}
      </div>
    );
  }
);

function DropdownMenu(props: DropdownMenuProps) {
  const { className, children, ...ulProps } = props;

  const daisyUIClasses = cn(
    'dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xs',
    className
  );

  return (
    <ul
      // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
      tabIndex={0}
      className={daisyUIClasses}
      {...ulProps}
    >
      {children}
    </ul>
  );
}

function DropdownItem(props: DropdownItemProps) {
  const { className, children, ...liProps } = props;

  return (
    <li className={className} {...liProps}>
      {children}
    </li>
  );
}

Dropdown.displayName = 'Dropdown';
DropdownToggle.displayName = 'DropdownToggle';
DropdownMenu.displayName = 'DropdownMenu';
DropdownItem.displayName = 'DropdownItem';

export default Object.assign(Dropdown, {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Item: DropdownItem,
});
