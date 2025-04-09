'use client';

/*
 * Tabs
 *
 * @Author: VenDream
 * @Date: 2024-09-13 10:23:11
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import {
  Tabs as DaisyTabs,
  type TabsProps as DaisyTabsProps,
} from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { useControllableValue } from 'ahooks';

export interface TabItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps extends Omit<DaisyTabsProps, 'onChange'> {
  name: string;
  items: TabItem[];

  value?: string | number;
  onChange?: (value: string | number) => void;

  className?: string;
  itemClassName?: string;
}

const { Tab } = DaisyTabs;

export default function Tabs(props: TabsProps) {
  const {
    name,
    items,
    value,
    onChange,
    className,
    itemClassName,
    ...tabsProps
  } = props;

  const [activeItem, setActiveItem] = useControllableValue(props, {
    defaultValue: items[0].value,
    valuePropName: 'value',
    trigger: 'onChange',
  });

  return (
    <DaisyTabs
      className={cn('rounded-box bg-base-200 space-x-2 p-2', className)}
      {...tabsProps}
    >
      {items.map(item => (
        <Tab
          key={item.value.toString()}
          name={name}
          icon={item.icon}
          label={item.label}
          className={itemClassName}
          active={activeItem === item.value}
          onClick={evt => {
            evt.preventDefault();
            evt.stopPropagation();
            setActiveItem(item.value);
          }}
        />
      ))}
    </DaisyTabs>
  );
}
