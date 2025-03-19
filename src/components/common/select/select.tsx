/*
 * Select
 *
 * @Author: VenDream
 * @Date: 2025-03-18 16:51:49
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import {
  Dropdown,
  type DropdownProps,
  Input,
} from '@/components/daisyui/index2';
import { cn } from '@/utils/classnames';
import { useControllableValue } from 'ahooks';
import { useRef } from 'react';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;

  options?: SelectOption[];
  align?: DropdownProps['align'];
  placeholder?: string;

  className?: string;
  inputClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
}

export default function Select(props: SelectProps) {
  const {
    options,
    align,
    placeholder,
    className,
    inputClassName,
    menuClassName,
    itemClassName,
  } = props;

  const toggleRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useControllableValue<string>(props, {
    defaultValue: '',
    valuePropName: 'value',
    trigger: 'onChange',
  });

  const selectedOption = options?.find(option => option.value === selected);

  return (
    <Dropdown align={align} className={cn('wbx-select', className)}>
      <Dropdown.Toggle ref={toggleRef}>
        <Input
          readOnly
          placeholder={placeholder}
          value={selectedOption?.label || ''}
          className={cn('select cursor-pointer', inputClassName)}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={cn(
          'bg-base-100 mt-2 flex flex-col flex-nowrap overflow-auto',
          menuClassName
        )}
      >
        {(options || []).map(option => (
          <Dropdown.Item
            key={option.value}
            className={cn(itemClassName, {
              'pointer-events-none': option.disabled,
              'text-base-content/50': option.disabled,
            })}
            onClick={() => {
              setSelected(option.value);
              (document.activeElement as HTMLDivElement)?.blur();
            }}
          >
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a>{option.label}</a>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
