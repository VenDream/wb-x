'use client';

/*
 * Toast
 *
 * @Author: VenDream
 * @Date: 2024-7-15 15:00:13
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { useTheme } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

interface IProps extends ToasterProps {
  font?: string;
}

export default function Toaster(props: IProps) {
  const { font, ...toasterProps } = props;
  const { theme } = useTheme();

  return (
    <Sonner
      offset={40}
      visibleToasts={3}
      position="top-center"
      theme={theme as ToasterProps['theme']}
      className="flex flex-col items-center"
      icons={{
        info: <InfoIcon size={20} className="text-info" />,
        success: <CircleCheckIcon size={20} className="text-success" />,
        warning: <CircleAlertIcon size={20} className="text-warning" />,
        error: <CircleXIcon size={20} className="text-error" />,
      }}
      toastOptions={{
        unstyled: true,
        className: cn(
          'flex items-center justify-center gap-2 shadow-sm text-sm py-3 px-4',
          'min-w-[250px] max-w-[60vw] rounded-[--rounded-box] text-base-content',
          'bg-base-100/80 backdrop-blur-sm border border-base-content/20'
        ),
        classNames: {
          content: font,
          info: 'text-info !border-info/20',
          success: 'text-success !border-success/20',
          warning: 'text-warning !border-warning/20',
          error: 'text-error !border-error/20',
        },
      }}
      {...toasterProps}
    />
  );
}
