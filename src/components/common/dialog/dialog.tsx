'use client';

/*
 * Dialog
 *
 * @Author: VenDream
 * @Date: 2023-08-28 14:22:56
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Modal, ModalProps } from '@/components/daisyui';
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
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
  hideCancelBtn?: boolean;
  hideOkBtn?: boolean;
};

const Icons: Record<Status, React.ReactNode> = {
  info: <InformationCircleIcon className="mr-1" strokeWidth={2} />,
  confirm: <QuestionMarkCircleIcon className="mr-1" strokeWidth={2} />,
  caution: <ExclamationCircleIcon className="mr-1" strokeWidth={2} />,
};

export default function useDialog() {
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
          <Modal.Header className="flex items-center text-base">
            {icon}
            {title}
          </Modal.Header>
          <Modal.Body className="text-sm">{body}</Modal.Body>
          <Modal.Actions>
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
          </Modal.Actions>
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
      root.render(<Dialog {...props} />);
      setTimeout(() => {
        handleShow();
      }, 0);
    },
    [Dialog, handleShow]
  );

  return { show };
}
