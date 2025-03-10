/*
 * DaisyUI Button
 *
 * @Author: VenDream
 * @Date: 2025-03-07 10:32:11
 *
 * @refer: https://daisyui.com/components/button
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

interface ButtonProps
  extends DaisyUI.Style,
    React.PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  wide?: boolean;
  block?: boolean;
  square?: boolean;
  circle?: boolean;

  active?: boolean;
  disabled?: boolean;

  size?: DaisyUI.Size;
  color?: DaisyUI.Color;
}

function Button(props: ButtonProps) {
  const {
    wide,
    block,
    square,
    circle,
    active,
    disabled,
    outline,
    dash,
    soft,
    ghost,
    link,
    size,
    color,
    className,
    children,
    ...btnProps
  } = props;

  const daisyUIClasses = cn(
    {
      btn: true,
      'btn-wide': wide,
      'btn-block': block,
      'btn-circle': circle,
      'btn-active': active,
      'btn-disabled': disabled,
      'btn-outline': outline,
      'btn-dashed': dash,
      'btn-soft': soft,
      'btn-ghost': ghost,
      'btn-link': link,
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
      'btn-xl': size === 'xl',
      'btn-neutral': color === 'neutral',
      'btn-primary': color === 'primary',
      'btn-secondary': color === 'secondary',
      'btn-accent': color === 'accent',
      'btn-info': color === 'info',
      'btn-success': color === 'success',
      'btn-warning': color === 'warning',
      'btn-error': color === 'error',
    },
    className
  );

  return (
    <button type="button" className={daisyUIClasses} {...btnProps}>
      {children}
    </button>
  );
}

Button.displayName = 'Button';

export default Button;
