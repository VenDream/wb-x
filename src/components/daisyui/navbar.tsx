/*
 * DaisyUI Navbar
 *
 * @Author: VenDream
 * @Date: 2025-03-07 11:28:51
 *
 * @refer: https://daisyui.com/components/navbar
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface NavbarProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

export interface NavbarStartProps extends NavbarProps {}
export interface NavbarCenterProps extends NavbarProps {}
export interface NavbarEndProps extends NavbarProps {}

function Navbar(props: NavbarProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('navbar', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function NavbarStart(props: NavbarStartProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('navbar-start', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function NavbarCenter(props: NavbarCenterProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('navbar-center', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function NavbarEnd(props: NavbarEndProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('navbar-end', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

Navbar.displayName = 'Navbar';
NavbarStart.displayName = 'NavbarStart';
NavbarCenter.displayName = 'NavbarCenter';
NavbarEnd.displayName = 'NavbarEnd';

export default Object.assign(Navbar, {
  Start: NavbarStart,
  End: NavbarEnd,
  Center: NavbarCenter,
});
