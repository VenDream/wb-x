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
import { isDarkTheme } from '@/utils/theme';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

interface IProps extends ToasterProps {
  font?: string;
}

export default function Toaster(props: IProps) {
  const { font, ...toasterProps } = props;
  const { theme } = useTheme();
  const t: ToasterProps['theme'] = isDarkTheme(theme) ? 'dark' : 'light';

  return (
    <Sonner
      theme={t}
      richColors
      position="top-center"
      offset={50}
      toastOptions={{
        // duration: 2000,
        className: 'shadow text-sm py-3 px-4 items-start',
        classNames: {
          icon: 'positive top-[3px]',
          content: font,
        },
      }}
      {...toasterProps}
    />
  );
}
