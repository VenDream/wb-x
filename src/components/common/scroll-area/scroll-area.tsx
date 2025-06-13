/*
 * Scroll Area
 *
 * @Author: VenDream
 * @Date: 2024-07-19 17:35:08
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { cn } from '@/utils/classnames';
import * as IScrollArea from '@radix-ui/react-scroll-area';

interface IProps extends React.PropsWithChildren {
  className?: string;
  viewportClassName?: string;
}

export default function ScrollArea(props: IProps) {
  return (
    <IScrollArea.Root className={cn('h-full', props.className)}>
      <IScrollArea.Viewport
        className={cn(
          'h-full w-full pt-18 pb-8 will-change-scroll lg:pt-0 lg:pb-0',
          props.viewportClassName
        )}
      >
        {props.children}
      </IScrollArea.Viewport>
      <IScrollArea.Scrollbar
        orientation="vertical"
        className={cn(
          'hidden w-2.5 touch-none p-0.5 select-none lg:flex',
          'transition-colors duration-[160ms] ease-out'
        )}
      >
        <IScrollArea.Thumb className="bg-base-content/15 flex-1 rounded-full" />
      </IScrollArea.Scrollbar>
    </IScrollArea.Root>
  );
}
