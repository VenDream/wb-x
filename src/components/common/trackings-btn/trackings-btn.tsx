'use client';

/*
 * Trackings Button
 *
 * @Author: VenDream
 * @Date: 2024-10-30 14:31:05
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import {
  appendTrackingUser,
  removeTrackingUser,
  triggerFullScan,
} from '@/api/client';
import { refreshTrackingUsers } from '@/app/actions';
import { useDialog } from '@/components/common/dialog';
import Tooltip from '@/components/common/tooltip';
import { Button, ButtonProps } from '@/components/daisyui';
import { WEIBO_HOST } from '@/contants';
import useTrackings, { useIsTracking } from '@/hooks/use-trackings';
import { cn } from '@/utils/classnames';
import { UserMinusIcon, UserPlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { toast } from 'sonner';

interface IProps extends ButtonProps {
  user: Backend.User;
  iconOnly?: boolean;
  iconSize?: number;
}

export default function TrackingsBtn(props: IProps) {
  const t1 = useTranslations('pages.user');
  const t2 = useTranslations('global.status');
  const t3 = useTranslations('global.action');
  const { user, iconOnly, iconSize = 16, ...btnProps } = props;

  const isTracking = useIsTracking(user.id);
  const shouldAskForScanning = useRef(false);
  const [, updateTrackings] = useTrackings();
  const { show: showDialog, update: updateDialog } = useDialog();

  const username = (
    <a
      target="_blank"
      rel="noreferrer"
      href={`${WEIBO_HOST}/${user.id}`}
      className="text-accent underline underline-offset-4"
    >
      @{user.name}
    </a>
  );

  const operatingTips = isTracking
    ? t1('untrackingOperating')
    : t1('trackingOperating');
  const operationOkTips = operatingTips + t2('success');
  const operationFailedTips = operatingTips + t2('error');

  const schedulingTips = t1('askForScanning.schedulingTips');
  const schedulingOkTips = schedulingTips + t2('success');
  const schedulingFailedTips = schedulingTips + t2('error');

  const askForScanning = () => {
    const dialogId = showDialog({
      preset: 'success',
      title: t1('askForScanning.title'),
      content: t1.rich('askForScanning.desc', { username: () => username }),
      okBtnLabel: t3('yes'),
      cancelBtnLabel: t3('no'),
      cancelBtn: undefined,
      onOk: async () => {
        return new Promise<boolean>(outerResolve => {
          updateDialog(dialogId, { loading: true });
          toast.promise(
            new Promise<void>((innerResolve, reject) =>
              triggerFullScan(user.id)
                .then(() => {
                  innerResolve();
                  outerResolve(true);
                })
                .catch(reject)
                .finally(() => {
                  updateDialog(dialogId, { loading: false });
                })
            ),
            {
              loading: schedulingTips,
              success: schedulingOkTips,
              error: (err: Error) => schedulingFailedTips + ': ' + err.message,
            }
          );
        });
      },
    });
  };

  const toggleTrackingStatus = () => {
    const toggleApi = isTracking ? removeTrackingUser : appendTrackingUser;

    const dialogId = showDialog({
      preset: 'confirm',
      content: t1.rich(isTracking ? 'removeFromTrackings' : 'addToTrackings', {
        username: () => username,
      }),
      onOk: async () => {
        return new Promise<boolean>(outerResolve => {
          updateDialog(dialogId, { loading: true });
          toast.promise(
            new Promise<void>((innerResolve, reject) =>
              toggleApi(user.id)
                .then(() => {
                  refreshTrackingUsers().then(() => {
                    if (isTracking) {
                      updateTrackings(ids => ids.filter(id => id !== user.id));
                    } else {
                      updateTrackings(ids => [...ids, user.id]);
                      shouldAskForScanning.current = true;
                    }
                    innerResolve();
                    outerResolve(true);
                  });
                })
                .catch((err: Error) => {
                  reject(err);
                  updateDialog(dialogId, { loading: false });
                })
            ),
            {
              loading: operatingTips,
              success: operationOkTips,
              error: (err: Error) => operationFailedTips + ': ' + err.message,
            }
          );
        });
      },
      onClosed: () => {
        if (shouldAskForScanning.current) {
          askForScanning();
          shouldAskForScanning.current = false;
        }
      },
    });
  };

  const Btn = (
    <Button
      size="xs"
      color={isTracking ? 'error' : 'info'}
      startIcon={
        isTracking ? (
          <UserMinusIcon size={iconSize} />
        ) : (
          <UserPlusIcon size={iconSize} />
        )
      }
      onClick={toggleTrackingStatus}
      {...btnProps}
    >
      {iconOnly ? null : isTracking ? t1('untrack') : t1('track')}
    </Button>
  );

  return iconOnly ? (
    <Tooltip
      message={isTracking ? t1('untrackTips') : t1('trackTips')}
      className={cn('px-2 py-1 text-xs', {
        'text-error': isTracking,
        'border-error': isTracking,
        'text-info': !isTracking,
        'border-info': !isTracking,
      })}
    >
      {Btn}
    </Tooltip>
  ) : (
    Btn
  );
}
