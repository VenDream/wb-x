/*
 * DaisyUI Badge
 *
 * @Author: VenDream
 * @Date: 2025-03-07 11:00:34
 *
 * @refer: https://daisyui.com/components/badge
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

interface BadgeProps
  extends Omit<DaisyUI.Style, 'link'>,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLSpanElement> {
  size?: DaisyUI.Size;
  color?: DaisyUI.Color;
}

function Badge(props: BadgeProps) {
  const {
    outline,
    dash,
    soft,
    ghost,
    size,
    color,
    className,
    children,
    ...badgeProps
  } = props;

  const daisyUIClasses = cn(
    {
      badge: true,
      'badge-outline': outline,
      'badge-dash': dash,
      'badge-soft': soft,
      'badge-ghost': ghost,
      'badge-xs': size === 'xs',
      'badge-sm': size === 'sm',
      'badge-md': size === 'md',
      'badge-lg': size === 'lg',
      'badge-xl': size === 'xl',
      'badge-neutral': color === 'neutral',
      'badge-primary': color === 'primary',
      'badge-secondary': color === 'secondary',
      'badge-accent': color === 'accent',
      'badge-info': color === 'info',
      'badge-success': color === 'success',
      'badge-warning': color === 'warning',
      'badge-error': color === 'error',
    },
    className
  );

  return (
    <span className={daisyUIClasses} {...badgeProps}>
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

export default Badge;
