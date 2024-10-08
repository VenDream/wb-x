/*
 * Ghost Tabs
 *
 * @Author: VenDream
 * @Date: 2024-09-13 10:23:11
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { Tab, Tabs, TabsProps } from '@/components/daisyui';
import { cn } from '@/utils/classnames';

import './ghost-tabs.sass';

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
              'h-auto border-base-content/10 p-0 text-sm leading-3',
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
