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

export interface DrawerProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  end?: boolean;
}

export interface DrawerToggleProps
  extends React.HTMLAttributes<HTMLInputElement> {}

export interface DrawerContentProps
  extends DrawerProps,
    React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerSideProps extends DrawerContentProps {}

export interface DrawerOverlayProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface DrawerButtonProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

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
  const { className, ...inputProps } = props;
  const daisyUIClasses = cn('drawer-toggle', className);

  return <input type="checkbox" className={daisyUIClasses} {...inputProps} />;
}

function DrawerSide(props: DrawerSideProps) {
  const { className, children, ...divProps } = props;
  const daisyUIClasses = cn('drawer-side z-99', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function DrawerOverlay(props: DrawerOverlayProps) {
  const { className, children, ...labelProps } = props;
  const daisyUIClasses = cn('drawer-overlay backdrop-blur-2xs', className);

  return (
    <label className={daisyUIClasses} {...labelProps} htmlFor={props.htmlFor}>
      {children}
    </label>
  );
}

function DrawerButton(props: DrawerButtonProps) {
  const { className, children, ...labelProps } = props;
  const daisyUIClasses = cn('drawer-button', 'btn btn-ghost', className);

  return (
    <label className={daisyUIClasses} {...labelProps} htmlFor={props.htmlFor}>
      {children}
    </label>
  );
}

Drawer.displayName = 'Drawer';
DrawerContent.displayName = 'DrawerContent';
DrawerToggle.displayName = 'DrawerToggle';
DrawerSide.displayName = 'DrawerSide';
DrawerOverlay.displayName = 'DrawerOverlay';
DrawerButton.displayName = 'DrawerButton';

export default Object.assign(Drawer, {
  Content: DrawerContent,
  Toggle: DrawerToggle,
  Side: DrawerSide,
  Overlay: DrawerOverlay,
  Button: DrawerButton,
});
