'use client';

/*
 * Dialog
 *
 * @Author: VenDream
 * @Date: 2023-08-28 14:22:56
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { ToastProvider } from '@/components/common/toast';
import {
  Button,
  Modal,
  ModalActions,
  ModalBody,
  ModalHeader,
  ModalProps,
} from '@/components/daisyui';
import { LANGS } from '@/contants';
import { default as enUS, default as zhCN } from '@/messages/en-US.json';
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
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
  hideHeader?: boolean;
  hideCancelBtn?: boolean;
  hideOkBtn?: boolean;
};

const Icons: Record<Status, React.ReactNode> = {
  info: <InformationCircleIcon className="mr-1" strokeWidth={2} />,
  confirm: <QuestionMarkCircleIcon className="mr-1" strokeWidth={2} />,
  caution: <ExclamationCircleIcon className="mr-1" strokeWidth={2} />,
};

export default function useDialog() {
  const locale = useLocale();
  const t = useTranslations('global');
  const { Dialog: IDialog, handleShow, handleHide } = Modal.useDialog();
  const defaultProps: DialogProps = useMemo(
    () => ({
      status: 'info',
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
        hideHeader,
        hideCancelBtn,
        hideOkBtn,
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
        <IDialog className="rounded-md" {...dialogProps}>
          {!hideHeader && (
            <ModalHeader className="flex items-center text-base">
              {icon}
              {title}
            </ModalHeader>
          )}
          <ModalBody className="text-sm">{body}</ModalBody>
          <ModalActions>
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
        </IDialog>
      );
    },
    [IDialog, defaultProps, handleHide]
  );

  const show = useCallback(
    (props: DialogProps) => {
      const el = document.createElement('div');
      el.setAttribute('data-role', 'dialog');
      document.body.appendChild(el);
      const root = createRoot(el);
      const propsCancel = props.onCancel;
      props.onCancel = () => {
        root.unmount();
        el.remove();
        propsCancel?.();
      };
      root.render(
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ToastProvider>
            <Dialog {...props} />
          </ToastProvider>
        </NextIntlClientProvider>
      );
      setTimeout(() => {
        handleShow();
      }, 0);
    },
    [Dialog, handleShow, locale, messages]
  );

  return { show };
}
