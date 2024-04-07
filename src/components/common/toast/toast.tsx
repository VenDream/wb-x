'use client';

/*
 * Toast
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:52:57
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Alert, AlertProps, Toast } from '@/components/daisyui';
import { generateId } from '@/utils/id';
import {
  CheckIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ToastProps = AlertProps & { duration?: number; message: React.ReactNode };
type ToastInstance = ToastProps & { id: string };
interface ToastHelpers {
  show: (props: ToastProps) => void;
  showInfoTips: (msg: ToastProps['message'], duration?: number) => void;
  showSuccessTips: (msg: ToastProps['message'], duration?: number) => void;
  showErrorTips: (msg: ToastProps['message'], duration?: number) => void;
}

export const ToastCtx = createContext<ToastHelpers | null>(null);

export function ToastProvider(props: ChildrenProps) {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const show = useCallback((props: ToastProps) => {
    const id = generateId(8);
    setToasts(prev => [...prev, { ...props, id }]);

    const duration = props.duration || 3000;
    const timer = setTimeout(() => {
      setToasts(prev => prev.filter(ins => ins.id !== id));
      clearTimeout(timer);
    }, duration);
  }, []);

  const showInfoTips = useCallback(
    (msg: ToastProps['message'], duration?: number) => {
      show({
        // status: 'info',
        icon: <InformationCircleIcon />,
        message: msg,
        duration,
      });
    },
    [show]
  );

  const showSuccessTips = useCallback(
    (msg: ToastProps['message'], duration?: number) => {
      show({
        status: 'success',
        icon: <CheckIcon />,
        message: msg,
        duration,
      });
    },
    [show]
  );

  const showErrorTips = useCallback(
    (msg: ToastProps['message'], duration?: number) => {
      show({
        status: 'error',
        icon: <XMarkIcon />,
        message: msg,
        duration,
      });
    },
    [show]
  );

  const helpers = useMemo<ToastHelpers>(
    () => ({ show, showInfoTips, showSuccessTips, showErrorTips }),
    [show, showErrorTips, showInfoTips, showSuccessTips]
  );

  const ToastContainer = useCallback(() => {
    if (toasts.length <= 0) return null;

    return (
      <Toast className="z-20" vertical="bottom" horizontal="end">
        {toasts.map(t => {
          const { id, icon, status, message, children } = t;
          return (
            <Alert
              key={id}
              icon={icon}
              status={status}
              className="border-regular-10 min-w-[200px] gap-1 rounded px-3 py-2 text-sm shadow"
            >
              {message || children}
            </Alert>
          );
        })}
      </Toast>
    );
  }, [toasts]);

  return (
    <ToastCtx.Provider value={helpers}>
      {props.children}
      <ToastContainer />
    </ToastCtx.Provider>
  );
}

export default function useToast() {
  const toastCtx = useContext(ToastCtx) as ToastHelpers;
  return toastCtx;
}
