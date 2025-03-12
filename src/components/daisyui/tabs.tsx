/*
 * DaisyUI Tabs Component
 *
 * @Author: VenDream
 * @Date: 2025-03-10 11:36:17
 *
 * @refer: https://daisyui.com/components/tabs
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface TabsProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  placement?: 'top' | 'bottom';
  size?: DaisyUI.Size;
}

export interface TabProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface TabContentProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

function Tabs(props: TabsProps) {
  const { placement, size, children, className, ...divProps } = props;

  const daisyUIClasses = cn(
    {
      tabs: true,
      'tabs-border': true,
      'tabs-top': placement === 'top',
      'tabs-bottom': placement === 'bottom',
      'tabs-xs': size === 'xs',
      'tabs-sm': size === 'sm',
      'tabs-md': size === 'md',
      'tabs-lg': size === 'lg',
      'tabs-xl': size === 'xl',
    },
    className
  );

  return (
    <div role="tablist" className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function Tab(props: TabProps) {
  const { name, label, active, disabled, children, className, ...inputProps } =
    props;

  const daisyUIClasses = cn(
    {
      tab: true,
      'tab-active': active,
      'tab-disabled': disabled,
      'px-2': true,
      'before:hidden': true,
      'bg-primary': active,
      'hover:after:text-primary': !active,
      'after:text-primary-content': active,
      'after:text-base-content/50': !active,
    },
    className
  );

  return (
    <input
      type="radio"
      name={name}
      aria-label={label}
      className={daisyUIClasses}
      {...inputProps}
    />
  );
}

function TabContent(props: TabContentProps) {
  const { children, className, ...divProps } = props;

  const daisyUIClasses = cn('tab-content', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

Tabs.displayName = 'Tabs';
Tab.displayName = 'Tab';
TabContent.displayName = 'TabContent';

export default Object.assign(Tabs, {
  Tab: Tab,
  Content: TabContent,
});
