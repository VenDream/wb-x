/*
 * DaisyUI Drawer
 *
 * @Author: VenDream
 * @Date: 2025-03-07 16:34:13
 *
 * @refer: https://daisyui.com/components/drawer
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

interface DrawerProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  end?: boolean;
}

interface DrawerToggleProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

type DrawerContentProps = DrawerProps;
type DrawerSideProps = DrawerToggleProps;
type DrawerOverlayProps = DrawerToggleProps;

function Drawer(props: DrawerProps) {
  const { open, end, className, children, ...divProps } = props;

  const daisyUIClasses = cn(
    {
      drawer: true,
      'drawer-end': end,
      'drawer-open': open,
    },
    className
  );

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function DrawerContent(props: DrawerContentProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('drawer-content', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function DrawerToggle(props: DrawerToggleProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('drawer-toggle', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function DrawerSide(props: DrawerSideProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('drawer-side', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function DrawerOverlay(props: DrawerOverlayProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('drawer-overlay', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

Drawer.displayName = 'Drawer';
DrawerContent.displayName = 'DrawerContent';
DrawerToggle.displayName = 'DrawerToggle';
DrawerSide.displayName = 'DrawerSide';
DrawerOverlay.displayName = 'DrawerOverlay';

export default Object.assign(Drawer, {
  Content: DrawerContent,
  Toggle: DrawerToggle,
  Side: DrawerSide,
  Overlay: DrawerOverlay,
});
