'use client';

/*
 * Trackings Button
 *
 * @Author: VenDream
 * @Date: 2024-10-30 14:31:05
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { appendTrackingUser, removeTrackingUser } from '@/api/client';
import { refreshTrackingUsers } from '@/app/actions';
import { useDialog } from '@/components/common/dialog';
import { Button, ButtonProps } from '@/components/daisyui';
import useTrackings, { useIsTracking } from '@/hooks/use-trackings';
import { UserMinusIcon, UserPlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface IProps extends ButtonProps {
  user: Backend.User;
}

export default function TrackingsBtn(props: IProps) {
  const t1 = useTranslations('pages.user');
  const t2 = useTranslations('global.status');
  const { user, ...btnProps } = props;

  const isTracking = useIsTracking(user.id);
  const [, updateTrackings] = useTrackings();
  const { show: showDialog, update: updateDialog } = useDialog();

  const username = (
    <span className="text-accent underline underline-offset-4">
      {user.name}
    </span>
  );

  const operatingTips = isTracking
    ? t1('untrackingOperating')
    : t1('trackingOperating');
  const operationOkTips = operatingTips + t2('success');
  const operationFailedTips = operatingTips + t2('error');

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
                    }
                    innerResolve();
                    outerResolve(true);
                  });
                })
                .catch(reject)
                .finally(() => {
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
    });
  };

  return (
    <Button
      size="xs"
      color={isTracking ? 'error' : 'primary'}
      startIcon={
        isTracking ? <UserMinusIcon size={16} /> : <UserPlusIcon size={16} />
      }
      onClick={toggleTrackingStatus}
      {...btnProps}
    >
      {isTracking ? t1('untrack') : t1('track')}
    </Button>
  );
}
