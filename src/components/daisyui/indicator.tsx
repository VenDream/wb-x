/*
 * DaisyUI Indicator
 *
 * @Author: VenDream
 * @Date: 2025-03-07 11:17:25
 *
 * @refer: https://daisyui.com/components/indicator
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

interface IndicatorProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

interface IndicatorItemProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLSpanElement> {
  placement?: 'start' | 'center' | 'end' | 'top' | 'middle' | 'bottom';
}

function Indicator(props: IndicatorProps) {
  const { className, children, ...divProps } = props;

  const daisyUIClasses = cn('indicator', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function IndicatorItem(props: IndicatorItemProps) {
  const { placement, className, children, ...spanProps } = props;

  const daisyUIClasses = cn(
    {
      'indicator-item': true,
      [`indicator-${placement}`]: placement,
    },
    className
  );

  return (
    <span className={daisyUIClasses} {...spanProps}>
      {children}
    </span>
  );
}

Indicator.displayName = 'Indicator';
IndicatorItem.displayName = 'IndicatorItem';

export default Object.assign(Indicator, { Item: IndicatorItem });
