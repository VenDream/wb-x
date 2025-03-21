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
}

export interface TabsProps extends Omit<DaisyTabsProps, 'onChange'> {
  name: string;
  items: TabItem[];
  icon?: React.ReactNode;

  value?: string | number;
  onChange?: (value: string | number) => void;

  className?: string;
  itemClassName?: string;
}

const { Tab } = DaisyTabs;

export default function Tabs(props: TabsProps) {
  const {
    name,
    icon,
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
    <DaisyTabs className={cn('', className)} {...tabsProps}>
      {items.map(item => (
        <Tab
          key={item.value.toString()}
          name={name}
          label={item.label}
          className={itemClassName}
          active={activeItem === item.value}
          onClick={() => setActiveItem(item.value)}
        />
      ))}
    </DaisyTabs>
  );
}
