/*
 * Ghost Tabs
 *
 * @Author: VenDream
 * @Date: 2024-09-13 10:23:11
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Tab, Tabs, type TabsProps } from '@/components/daisyui';
import { cn } from '@/utils/classnames';

import './ghost-tabs.css';

export interface TabOption<T> {
  label: string;
  value: T;
}

interface IProps<T> extends Omit<TabsProps<T>, 'children'> {
  options: TabOption<T>[];
  icon?: React.ReactNode;
  tabClassName?: string;
}

export default function GhostTabs<T>(props: IProps<T>) {
  const {
    icon,
    options,
    value,
    onChange,
    className,
    tabClassName,
    ...tabsProps
  } = props;

  return (
    <div className="flex items-center gap-2">
      {icon}
      <Tabs
        size="sm"
        value={value}
        onChange={onChange}
        className={cn('wbx-ghost-tabs space-x-2 divide-x', className)}
        {...tabsProps}
      >
        {options.map((option, idx) => (
          <Tab
            key={idx}
            value={option.value}
            className={cn(
              'border-base-content/10 h-auto p-0 text-sm leading-3',
              tabClassName
            )}
          >
            {option.label}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
