'use client';

/*
 * Tooltip Component
 *
 * @Author: VenDream
 * @Date: 2024-09-09 15:22:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import MotionContainer from '@/components/common/motion-container';
import { dialogMotion } from '@/contants/motions';
import { cn } from '@/utils/classnames';
import * as ITooltip from '@radix-ui/react-tooltip';
import { AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface IProps extends ITooltip.TooltipProps {
  message: ReactNode;
  className?: string;
}

export default function Tooltip(props: IProps) {
  const { message, className, children, ...tooltipProps } = props;
  const [open, setOpen] = useState(false);

  return (
    <ITooltip.Root
      open={open}
      delayDuration={0}
      onOpenChange={setOpen}
      {...tooltipProps}
    >
      <ITooltip.Trigger asChild>{children}</ITooltip.Trigger>
      <AnimatePresence>
        {open && (
          <ITooltip.Portal forceMount>
            <ITooltip.Content side="top" align="center" className="!z-50">
              <MotionContainer
                motion={dialogMotion}
                className={cn(
                  'flex items-center justify-center px-4 py-2 text-sm shadow-sm',
                  'border border-base-content/10 bg-base-100/50 backdrop-blur',
                  'rounded-[--rounded-box]',
                  className
                )}
              >
                {message}
              </MotionContainer>
              <ITooltip.Arrow className="fill-none stroke-base-content/10" />
            </ITooltip.Content>
          </ITooltip.Portal>
        )}
      </AnimatePresence>
    </ITooltip.Root>
  );
}
