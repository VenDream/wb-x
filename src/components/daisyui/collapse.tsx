/*
 * DaisyUI Collapse
 *
 * @Author: VenDream
 * @Date: 2025-03-27 16:43:18
 *
 * @refer: https://daisyui.com/components/collapse
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface CollapseProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  arrow?: boolean;
  plus?: boolean;
  inputClassName?: string;
}

export interface CollapseTitleProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

export interface CollapseContentProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

function Collapse(props: CollapseProps) {
  const { arrow, plus, inputClassName, className, children, ...divProps } =
    props;

  const daisyUIClasses = cn(
    {
      collapse: true,
      'collapse-arrow': arrow,
      'collapse-plus': plus,
    },
    className
  );

  return (
    <div className={daisyUIClasses} {...divProps}>
      <input type="checkbox" className={cn('peer', inputClassName)} />
      {children}
    </div>
  );
}

function CollapseTitle(props: CollapseTitleProps) {
  const { className, children, ...divProps } = props;

  const daisyUIClasses = cn('collapse-title', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function CollapseContent(props: CollapseContentProps) {
  const { className, children, ...divProps } = props;

  const daisyUIClasses = cn('collapse-content', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

Collapse.displayName = 'Collapse';
CollapseTitle.displayName = 'CollapseTitle';
CollapseContent.displayName = 'CollapseContent';

export default Object.assign(Collapse, {
  Title: CollapseTitle,
  Content: CollapseContent,
});
