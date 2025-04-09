/*
 * DaisyUI Toggle
 *
 * @Author: VenDream
 * @Date: 2025-03-10 15:29:42
 *
 * @reference: https://daisyui.com/components/toggle
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  size?: DaisyUI.Size;
  color?: DaisyUI.Color;
}

function Toggle(props: ToggleProps) {
  const { checked, onChange, size, color, className, ...inputProps } = props;

  const daisyUIClasses = cn(
    {
      toggle: true,
      'toggle-xs': size === 'xs',
      'toggle-sm': size === 'sm',
      'toggle-md': size === 'md',
      'toggle-lg': size === 'lg',
      'toggle-xl': size === 'xl',
      'toggle-neutral': color === 'neutral',
      'toggle-primary': color === 'primary',
      'toggle-secondary': color === 'secondary',
      'toggle-accent': color === 'accent',
      'toggle-info': color === 'info',
      'toggle-success': color === 'success',
      'toggle-warning': color === 'warning',
      'toggle-error': color === 'error',
    },
    className
  );

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={daisyUIClasses}
      {...inputProps}
    />
  );
}

Toggle.displayName = 'Toggle';

export default Toggle;
