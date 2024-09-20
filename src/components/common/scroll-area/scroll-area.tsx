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
          'h-full w-full will-change-scroll',
          props.viewportClassName
        )}
      >
        {props.children}
      </IScrollArea.Viewport>
      <IScrollArea.Scrollbar
        orientation="vertical"
        className={cn(
          'flex w-2.5 touch-none select-none p-0.5',
          'transition-colors duration-[160ms] ease-out'
        )}
      >
        <IScrollArea.Thumb className="flex-1 rounded-full bg-base-content/15" />
      </IScrollArea.Scrollbar>
    </IScrollArea.Root>
  );
}
