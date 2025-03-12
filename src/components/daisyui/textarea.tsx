/*
 * DaisyUI Textarea
 *
 * @Author: VenDream
 * @Date: 2025-03-10 15:45:17
 *
 * @reference: https://daisyui.com/components/textarea
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import { forwardRef } from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ghost?: boolean;

  size?: DaisyUI.Size;
  color?: DaisyUI.Color;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { ghost, size, color, className, ...textareaProps } = props;

    const daisyUIClasses = cn(
      {
        textarea: true,
        'textarea-ghost': ghost,
        'textarea-xs': size === 'xs',
        'textarea-sm': size === 'sm',
        'textarea-md': size === 'md',
        'textarea-lg': size === 'lg',
        'textarea-xl': size === 'xl',
        'textarea-neutral': color === 'neutral',
        'textarea-primary': color === 'primary',
        'textarea-secondary': color === 'secondary',
        'textarea-accent': color === 'accent',
        'textarea-info': color === 'info',
        'textarea-success': color === 'success',
        'textarea-warning': color === 'warning',
        'textarea-error': color === 'error',
      },
      className
    );

    return <textarea ref={ref} className={daisyUIClasses} {...textareaProps} />;
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
