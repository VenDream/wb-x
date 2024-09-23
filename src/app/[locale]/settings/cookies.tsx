/*
 * Cookies Settings
 *
 * @Author: VenDream
 * @Date: 2024-08-14 16:01:04
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import {
  checkCookie,
  listCookies,
  removeCookie,
  updateCookie,
} from '@/api/client';
import { useDialog } from '@/components/common/dialog';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { NoData } from '@/components/common/no-data';
import { Button, Textarea } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { PlusIcon, RadarIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddCookies from './add-cookies';

export default function CookiesSettings() {
  const t = useTranslations('pages.settings.cookies');
  const { show: showDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [isOperating, setIsOperating] = useState(false);
  const [cookies, setCookies] = useState<Backend.Cookie[]>([]);

  const operatingTips = t('status.operating');
  const operationOkTips = operatingTips + t('status.ok');
  const operationFailedTips = operatingTips + t('status.failed');

  const checkingTips = t('status.checking');
  const validTips = checkingTips + t('status.valid');
  const invalidTips = checkingTips + t('status.invalid');

  const getCookies = useCallback(async () => {
    try {
      setIsLoading(true);
      const cookies = await listCookies();
      setCookies(cookies);
    } catch (err) {
      console.error(err);
      toast.error(t('status.fetchFailed'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const update = (idx: number) => {
    const cookie = cookies[idx];
    if (!cookie.value) return toast.error(t('status.noInput'));

    setIsOperating(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        updateCookie(idx, cookie.value)
          .then(() => {
            getCookies();
            resolve();
          })
          .catch(reject)
          .finally(() => {
            setIsOperating(false);
          })
      ),
      {
        loading: operatingTips,
        success: operationOkTips,
        error: (err: Error) => operationFailedTips + ': ' + err.message,
      }
    );
  };

  const check = (idx: number) => {
    const cookie = cookies[idx];
    if (!cookie.value) return toast.error(t('status.noInput'));

    setIsOperating(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        checkCookie(cookie.value)
          .then(data => {
            const { isValid } = data;
            isValid ? resolve() : reject();
          })
          .catch(reject)
          .finally(() => {
            setIsOperating(false);
          })
      ),
      {
        loading: checkingTips,
        success: validTips,
        error: invalidTips,
      }
    );
  };

  const remove = (idx: number) => {
    showDialog({
      preset: 'confirm',
      content: t('deleteConfirm.confirm'),
      onOk: () => {
        setIsOperating(true);
        toast.promise(
          new Promise<void>((resolve, reject) =>
            removeCookie(idx)
              .then(() => {
                getCookies();
                resolve();
              })
              .catch(reject)
              .finally(() => {
                setIsOperating(false);
              })
          ),
          {
            loading: operatingTips,
            success: operationOkTips,
            error: (err: Error) => operationFailedTips + ': ' + err.message,
          }
        );
        return true;
      },
    });
  };

  useEffect(() => {
    getCookies();
  }, [getCookies]);

  return isLoading ? (
    <div className="p-4">
      <Loading />
    </div>
  ) : (
    <MotionContainer>
      <div className={cn('relative space-y-4 p-4')}>
        {cookies.length > 0 ? (
          cookies.map((cookie, idx) => (
            <div key={cookie.idx} className="flex gap-4">
              <label>Cookie #{cookie.idx + 1}</label>
              <Textarea
                rows={4}
                value={cookie.value}
                placeholder={t('addCookie.placeholder')}
                className="no-scrollbar flex-1 resize-none break-all"
                onChange={e =>
                  setCookies(cookies => {
                    const newCookies = [...cookies];
                    newCookies[idx].value = e.target.value;
                    return newCookies;
                  })
                }
              />
              <div className="flex flex-col gap-4">
                <Button size="sm" color="primary" onClick={() => update(idx)}>
                  <SaveIcon size={16} />
                  {t('operation.save')}
                </Button>
                <Button size="sm" color="primary" onClick={() => check(idx)}>
                  <RadarIcon size={16} />
                  {t('operation.check')}
                </Button>
                <Button
                  size="sm"
                  color="error"
                  onClick={() => remove(idx)}
                  disabled={cookies.length <= 1}
                >
                  <Trash2Icon size={16} />
                  {t('operation.delete')}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <NoData className="justify-start" />
        )}
        <div className="h-[1px] bg-base-content/10" />
        <AddCookies onAdded={getCookies}>
          <Button size="sm" color="primary">
            <PlusIcon size={16} />
            {t('operation.add')}
          </Button>
        </AddCookies>
        {isOperating && (
          <div className="absolute inset-0 !mt-0 h-full w-full bg-base-100/80" />
        )}
      </div>
    </MotionContainer>
  );
}
