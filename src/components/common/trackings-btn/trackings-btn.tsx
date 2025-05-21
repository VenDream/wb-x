'use client';

/*
 * Trackings Button
 *
 * @Author: VenDream
 * @Date: 2024-10-30 14:31:05
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { twitter, weibo } from '@/api/client';
import { useDialog } from '@/components/common/dialog';
import Tooltip from '@/components/common/tooltip';
import { Button, type ButtonProps } from '@/components/daisyui';
import { TWITTER_HOST, WEIBO_HOST } from '@/constants';
import { Link } from '@/i18n/routing';
import { twUserTrackingsAtom, wbUserTrackingsAtom } from '@/store';
import { cn } from '@/utils/classnames';
import { useAtom } from 'jotai';
import { UserMinusIcon, UserPlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { toast } from 'sonner';

interface IProps extends ButtonProps {
  platform: Platform;
  user: Weibo.User | Twitter.User;
  iconOnly?: boolean;
  iconSize?: number;
  onTrackUser?: () => void;
  onUntrackUser?: () => void;
}

export default function TrackingsBtn(props: IProps) {
  const t1 = useTranslations('pages.users');
  const t2 = useTranslations('global.status');
  const t3 = useTranslations('global.action');
  const t4 = useTranslations('global.platform');
  const {
    user,
    iconOnly,
    iconSize = 16,
    onTrackUser,
    onUntrackUser,
    ...btnProps
  } = props;

  const isWeibo = props.platform === 'weibo';
  const apiClient = isWeibo ? weibo : twitter;

  const shouldAskForScanning = useRef(false);
  const [userTrackings, setUserTrackings] = useAtom(
    isWeibo ? wbUserTrackingsAtom : twUserTrackingsAtom
  );
  const { show: showDialog, update: updateDialog } = useDialog();

  const userId = user.id;
  const isTracking = userTrackings[userId] ?? user.isTracking;
  const userLink = isWeibo
    ? `${WEIBO_HOST}/${userId}`
    : `${TWITTER_HOST}/${(user as Twitter.User).screenName}`;

  const username = (
    <Link
      target="_blank"
      rel="noreferrer"
      href={userLink}
      className="text-accent underline underline-offset-3"
    >
      @{user.name}
    </Link>
  );

  const operatingTips = isTracking
    ? t1('untrackingOperating')
    : t1('trackingOperating');
  const operationOkTips = operatingTips + t2('success');
  const operationFailedTips = operatingTips + t2('error');

  const schedulingTips = t1('askForScanning.schedulingTips');
  const schedulingOkTips = schedulingTips + t2('success');
  const schedulingFailedTips = schedulingTips + t2('error');

  const updateUserTrackings = (patch: Record<string, boolean>) => {
    setUserTrackings(trackings => ({
      ...trackings,
      ...patch,
    }));
  };

  const askForScanning = () => {
    const dialogId = showDialog({
      preset: 'success',
      title: t1('askForScanning.title'),
      content: t1.rich('askForScanning.desc', {
        platform: () => t4(props.platform),
        username: () => username,
      }),
      okBtnLabel: t3('yes'),
      cancelBtnLabel: t3('no'),
      cancelBtn: undefined,
      onOk: async () => {
        return new Promise<boolean>(outerResolve => {
          updateDialog(dialogId, { loading: true });
          toast.promise(
            new Promise<void>((innerResolve, reject) =>
              apiClient
                .triggerFullScan(userId)
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
              error: (err: Error) => `${schedulingFailedTips}: ${err.message}`,
            }
          );
        });
      },
    });
  };

  const toggleUserTrackings = () => {
    const toggleAPI = isTracking ? apiClient.untrackUser : apiClient.trackUser;

    const dialogId = showDialog({
      preset: 'confirm',
      content: t1.rich(isTracking ? 'removeFromTrackings' : 'addToTrackings', {
        platform: () => t4(props.platform),
        username: () => username,
      }),
      onOk: async () => {
        return new Promise<boolean>(outerResolve => {
          updateDialog(dialogId, { loading: true });
          toast.promise(
            new Promise<void>((innerResolve, reject) =>
              toggleAPI(userId)
                .then(() => {
                  if (isTracking) {
                    updateUserTrackings({ [userId]: false });
                    onUntrackUser?.();
                  } else {
                    updateUserTrackings({ [userId]: true });
                    onTrackUser?.();
                    shouldAskForScanning.current = true;
                  }
                  innerResolve();
                  outerResolve(true);
                })
                .catch((err: Error) => {
                  reject(err);
                  updateDialog(dialogId, { loading: false });
                })
            ),
            {
              loading: operatingTips,
              success: operationOkTips,
              error: (err: Error) => `${operationFailedTips}: ${err.message}`,
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
      onClick={toggleUserTrackings}
      {...btnProps}
    >
      {isTracking ? (
        <UserMinusIcon size={iconSize} />
      ) : (
        <UserPlusIcon size={iconSize} />
      )}
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
