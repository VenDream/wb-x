/*
 * Dialog Types
 *
 * @Author: VenDream
 * @Date: 2024-08-19 11:18:00
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { PropsWithChildren, ReactNode } from 'react';
import { ButtonProps } from 'react-daisyui';

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

  wrapperClassName?: string;
  scrollAreaClassName?: string;
  className?: string;
  maskClassName?: string;
  titleClassName?: string;
  descClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  cancelBtnClassName?: string;
  okBtnClassName?: string;
}

export interface DialogInstance {
  id: string;
  close: () => void;
  props: DialogProps;
  update: (props: DialogProps) => void;
}
