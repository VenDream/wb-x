/*
 * DaisyUI Input
 *
 * @Author: VenDream
 * @Date: 2025-03-11 10:31:55
 *
 * @reference: https://daisyui.com/components/input
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { forwardRef } from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ghost?: boolean;

  size?: DaisyUI.Size;
  color?: DaisyUI.Color;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { ghost, size, color, className, ...inputProps } = props;

  const daisyUIClasses = cn(
    {
      input: true,
      'border-1': true,
      'input-ghost': ghost,
      'input-xs': size === 'xs',
      'input-sm': size === 'sm',
      'input-md': size === 'md',
      'input-lg': size === 'lg',
      'input-xl': size === 'xl',
      'input-neutral': color === 'neutral',
      'input-primary': color === 'primary',
      'input-secondary': color === 'secondary',
      'input-accent': color === 'accent',
      'input-info': color === 'info',
      'input-success': color === 'success',
      'input-warning': color === 'warning',
      'input-error': color === 'error',
    },
    className
  );

  return (
    <input type="text" ref={ref} className={daisyUIClasses} {...inputProps} />
  );
});

Input.displayName = 'Input';

export default Input;
