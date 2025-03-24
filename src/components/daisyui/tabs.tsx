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

export interface TabProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name?: string;
  icon?: React.ReactNode;
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
  const {
    name,
    icon,
    label,
    active,
    disabled,
    children,
    className,
    ...labelProps
  } = props;

  const daisyUIClasses = cn(
    'tab flex items-center before:hidden after:hidden px-2 gap-1',
    {
      'tab-active': active,
      'tab-disabled': disabled,
      'bg-primary': active,
      'text-primary-content': active,
    },
    className
  );

  return (
    <label className={daisyUIClasses} {...labelProps}>
      <input type="radio" name={name} className="hidden" />
      {icon}
      {label}
    </label>
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
