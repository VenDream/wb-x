/*
 * DaisyUI Stats Component
 *
 * @Author: VenDream
 * @Date: 2025-03-10 11:06:15
 *
 * @refer: https://daisyui.com/components/stat
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface StatsProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
}

export interface StatProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

export interface StatTitleProps extends StatProps {}
export interface StatValueProps extends StatProps {}
export interface StatDescProps extends StatProps {}
export interface StatFigureProps extends StatProps {}
export interface StatActionsProps extends StatProps {}

function Stats(props: StatsProps) {
  const { direction, children, className, ...divProps } = props;

  const daisyUIClasses = cn(
    {
      stats: true,
      'stats-horizontal': direction === 'horizontal',
      'stats-vertical': direction === 'vertical',
    },
    className
  );

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function Stat(props: StatProps) {
  const { children, className, ...divProps } = props;
  return (
    <div className={cn('stat', className)} {...divProps}>
      {children}
    </div>
  );
}

function StatTitle(props: StatTitleProps) {
  const { children, className, ...divProps } = props;
  return (
    <div className={cn('stat-title', className)} {...divProps}>
      {children}
    </div>
  );
}

function StatValue(props: StatValueProps) {
  const { children, className, ...divProps } = props;
  return (
    <div className={cn('stat-value', className)} {...divProps}>
      {children}
    </div>
  );
}

function StatDesc(props: StatDescProps) {
  const { children, className, ...divProps } = props;
  return (
    <div className={cn('stat-desc', className)} {...divProps}>
      {children}
    </div>
  );
}

function StatFigure(props: StatFigureProps) {
  const { children, className, ...divProps } = props;
  return (
    <div className={cn('stat-figure', className)} {...divProps}>
      {children}
    </div>
  );
}

function StatActions(props: StatActionsProps) {
  const { children, className, ...divProps } = props;
  return (
    <div className={cn('stat-actions', className)} {...divProps}>
      {children}
    </div>
  );
}

Stats.displayName = 'Stats';
Stat.displayName = 'Stat';
StatTitle.displayName = 'StatTitle';
StatValue.displayName = 'StatValue';
StatDesc.displayName = 'StatDesc';
StatFigure.displayName = 'StatFigure';
StatActions.displayName = 'StatActions';

export default Object.assign(Stats, {
  Stat: Stat,
  Title: StatTitle,
  Value: StatValue,
  Desc: StatDesc,
  Figure: StatFigure,
  Actions: StatActions,
});
