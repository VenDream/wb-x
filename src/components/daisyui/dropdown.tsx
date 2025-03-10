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

interface DropdownProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  trigger?: 'click' | 'hover';
  align?: 'start' | 'center' | 'end';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface ToggleProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

interface MenuProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLUListElement> {}

interface ItemProps
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

function DropdownToggle(props: ToggleProps) {
  const { className, children, ...divProps } = props;

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <div tabIndex={0} role="button" className={className} {...divProps}>
      {children}
    </div>
  );
}

function DropdownMenu(props: MenuProps) {
  const { className, children, ...ulProps } = props;

  const daisyUIClasses = cn(
    'dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm',
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

function DropdownItem(props: ItemProps) {
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
