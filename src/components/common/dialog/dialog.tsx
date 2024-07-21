'use client';

/*
 * Dialog
 *
 * @Author: VenDream
 * @Date: 2023-08-28 14:22:56
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import ScrollArea from '@/components/common/scroll-area';
import {
  Button,
  Modal,
  ModalActions,
  ModalBody,
  ModalHeader,
  ModalProps,
} from '@/components/daisyui';
import { LANGS } from '@/contants';
import enUS from '@/messages/en-US.json';
import zhCN from '@/messages/zh-CN.json';
import { cn } from '@/utils/classnames';
import { generateId } from '@/utils/id';
import { CircleHelpIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';
import React, { useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

type Status = 'info' | 'confirm' | 'caution';

type DialogProps = Omit<ModalProps, 'title'> & {
  status?: Status;
  title?: React.ReactNode;
  body?: React.ReactNode;
  cancelBtnLabel?: string;
  okBtnLabel?: string;
  onCancel?: () => void;
  onOk?: () => void;
  hideIcon?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideCancelBtn?: boolean;
  hideOkBtn?: boolean;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

const Icons: Record<Status, React.ReactNode> = {
  info: <InfoIcon size={20} className="mr-2" />,
  confirm: <CircleHelpIcon size={20} className="mr-2" />,
  caution: <TriangleAlertIcon size={20} className="mr-2" />,
};

export default function useDialog() {
  const locale = useLocale();
  const t = useTranslations('global');
  const { Dialog: IDialog, handleShow, handleHide } = Modal.useDialog();
  const defaultProps: DialogProps = useMemo(
    () => ({
      status: 'info',
      backdrop: true,
      title: t('dialog.title'),
      body: t('dialog.body'),
      cancelBtnLabel: t('action.cancel'),
      okBtnLabel: t('action.ok'),
    }),
    [t]
  );

  const messages = locale === LANGS.en ? enUS : zhCN;

  const Dialog = useCallback(
    (props: DialogProps) => {
      const {
        status,
        title,
        body,
        cancelBtnLabel,
        okBtnLabel,
        onCancel,
        onOk,
        hideIcon,
        hideHeader,
        hideFooter,
        hideCancelBtn,
        hideOkBtn,
        className,
        headerClassName,
        bodyClassName,
        footerClassName,
        ...dialogProps
      } = { ...defaultProps, ...props };

      const icon = Icons[status as Status];
      const cancel = () => {
        handleHide();
        onCancel?.();
      };
      const ok = () => {
        handleHide();
        onOk?.();
      };

      return (
        <IDialog
          {...dialogProps}
          className={cn(
            'flex w-auto min-w-[30rem] max-w-[50rem] flex-col gap-[1.5rem]',
            className
          )}
        >
          {!hideHeader && (
            <ModalHeader
              className={cn(
                'mb-0 flex items-center text-base',
                headerClassName
              )}
            >
              {!hideIcon && icon}
              {title}
            </ModalHeader>
          )}
          <ModalBody
            className={cn(
              'min-h-0 flex-1 rounded-[--rounded-box] text-sm',
              bodyClassName
            )}
          >
            <ScrollArea>{body}</ScrollArea>
          </ModalBody>
          {!hideFooter && (
            <ModalActions className={cn(footerClassName, 'mt-0')}>
              {!hideCancelBtn && (
                <Button size="sm" onClick={cancel}>
                  {cancelBtnLabel}
                </Button>
              )}
              {!hideOkBtn && (
                <Button size="sm" color="primary" onClick={ok}>
                  {okBtnLabel}
                </Button>
              )}
            </ModalActions>
          )}
        </IDialog>
      );
    },
    [IDialog, defaultProps, handleHide]
  );

  const show = useCallback(
    (props: DialogProps) => {
      const id = generateId(6);
      const el = document.createElement('div');
      el.setAttribute('data-id', id);
      el.setAttribute('data-role', 'dialog');
      document.body.appendChild(el);

      const root = createRoot(el);
      const propsCancel = props.onCancel;
      const closeDialog = () => {
        const box = el.querySelector('.modal-box');
        box?.addEventListener(
          'transitionend',
          () => {
            root.unmount();
            el.remove();
            propsCancel?.();
          },
          { once: true }
        );
      };
      props.onCancel = closeDialog;
      root.render(
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Dialog {...props} />
        </NextIntlClientProvider>
      );

      setTimeout(() => {
        handleShow();
        const dialog = el.querySelector('dialog');
        const backdrop = el.querySelector('.modal-backdrop');

        dialog?.addEventListener(
          'cancel',
          evt => {
            evt.preventDefault();
            closeDialog();
          },
          { once: true }
        );
        backdrop?.addEventListener('click', closeDialog, { once: true });
      }, 0);
    },
    [Dialog, handleShow, locale, messages]
  );

  return { show };
}
