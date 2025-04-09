/*
 * DaisyUI Menu
 *
 * @Author: VenDream
 * @Date: 2025-03-07 16:53:50
 *
 * @refer: https://daisyui.com/components/menu
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface MenuProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLUListElement> {
  size?: DaisyUI.Size;
  direction?: 'vertical' | 'horizontal';
}

export interface MenuTitleProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLLIElement> {}

export interface MenuItemProps extends MenuTitleProps {
  disabled?: boolean;
}

function Menu(props: MenuProps) {
  const { size, direction, className, children, ...ulProps } = props;

  const daisyUIClasses = cn(
    'menu',
    {
      'menu-xs': size === 'xs',
      'menu-sm': size === 'sm',
      'menu-md': size === 'md',
      'menu-lg': size === 'lg',
      'menu-xl': size === 'xl',
      'menu-vertical': direction === 'vertical',
      'menu-horizontal': direction === 'horizontal',
    },
    className
  );

  return (
    <ul className={daisyUIClasses} {...ulProps}>
      {children}
    </ul>
  );
}

function MenuTitle(props: MenuTitleProps) {
  const { className, children, ...liProps } = props;

  const daisyUIClasses = cn('menu-title', className);

  return (
    <li className={daisyUIClasses} {...liProps}>
      {children}
    </li>
  );
}

function MenuItem(props: MenuItemProps) {
  const { disabled, className, children, ...liProps } = props;

  const daisyUIClasses = cn(
    {
      'menu-disabled': disabled,
    },
    className
  );

  return (
    <li className={daisyUIClasses} {...liProps}>
      {children}
    </li>
  );
}

Menu.displayName = 'Menu';
MenuTitle.displayName = 'MenuTitle';
MenuItem.displayName = 'MenuItem';

export default Object.assign(Menu, {
  Title: MenuTitle,
  Item: MenuItem,
});
