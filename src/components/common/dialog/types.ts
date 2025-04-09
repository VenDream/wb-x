/*
 * Dialog Types
 *
 * @Author: VenDream
 * @Date: 2024-08-19 11:18:00
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import type { ButtonProps } from '@/components/daisyui';
import type { PropsWithChildren, ReactNode } from 'react';

export interface DialogContext {
  instances: DialogInstance[];
  closeTop: () => void;
  closeAll: () => void;
  close: (id: string) => void;
  show: (props: DialogProps) => string;
  update: (id: string, patch: Partial<DialogProps>) => void;
}

export interface DialogProps extends PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  preset?: 'alert' | 'confirm' | 'info' | 'success' | 'warning' | 'error';
  disposable?: boolean;

  title?: ReactNode;
  icon?: ReactNode;
  desc?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;

  loading?: boolean;
  closable?: boolean;
  moveable?: boolean;
  keyboard?: boolean;
  mask?: boolean;
  maskClosable?: boolean;

  onOk?: () => void | Promise<void> | boolean | Promise<boolean>;
  okBtn?: ReactNode;
  okBtnLabel?: string;
  okBtnProps?: ButtonProps;

  onCancel?: () => void;
  cancelBtn?: ReactNode;
  cancelBtnLabel?: string;
  cancelBtnProps?: ButtonProps;

  onOpened?: () => void;
  onClosed?: () => void;

  className?: string;
  classNames?: {
    wrapper?: string;
    scrollArea?: string;
    mask?: string;
    title?: string;
    desc?: string;
    content?: string;
    footer?: string;
    cancelBtn?: string;
    okBtn?: string;
  };
}

export interface DialogInstance {
  id: string;
  close: () => void;
  props: DialogProps;
  update: (props: DialogProps) => void;
}
