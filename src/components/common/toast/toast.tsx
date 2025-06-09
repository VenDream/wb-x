'use client';

import { useIsMobile } from '@/hooks/use-media-query';
/*
 * Toast
 *
 * @Author: VenDream
 * @Date: 2024-7-15 15:00:13
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

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

  const isMobile = useIsMobile();

  return (
    <Sonner
      offset={{ top: '5%' }}
      mobileOffset={{ bottom: '5%', left: '0' }}
      visibleToasts={3}
      position={isMobile ? 'bottom-center' : 'top-center'}
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
          'flex items-center justify-center gap-2 shadow-xs text-sm py-2 px-6',
          'min-w-[300px] max-w-[60vw] rounded-box text-base-content',
          'bg-base-100/80 backdrop-blur-lg border border-base-content/20',
          '!left-1/2 -translate-x-1/2'
        ),
        classNames: {
          content: cn(font, 'break-all'),
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
