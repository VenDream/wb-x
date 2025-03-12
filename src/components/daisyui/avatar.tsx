/*
 * DaisyUI Avatar
 *
 * @Author: VenDream
 * @Date: 2025-03-11 10:40:30
 *
 * @reference: https://daisyui.com/components/avatar
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';

export interface AvatarProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  online?: boolean;
  offline?: boolean;
  placeholder?: string;
}

export interface AvatarGroupProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

function Avatar(props: AvatarProps) {
  const { online, offline, placeholder, className, children, ...divProps } =
    props;

  const daisyUIClasses = cn(
    {
      avatar: true,
      'avatar-online': online,
      'avatar-offline': offline,
      'avatar-placeholder': placeholder,
    },
    className
  );

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

function AvatarGroup(props: AvatarGroupProps) {
  const { className, children, ...divProps } = props;

  const daisyUIClasses = cn('avatar-group', className);

  return (
    <div className={daisyUIClasses} {...divProps}>
      {children}
    </div>
  );
}

Avatar.displayName = 'Avatar';
AvatarGroup.displayName = 'AvatarGroup';

export default Object.assign(Avatar, {
  Group: AvatarGroup,
});
