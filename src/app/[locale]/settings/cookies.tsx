/*
 * Cookies Settings
 *
 * @Author: VenDream
 * @Date: 2024-08-14 16:01:04
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/client';
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
  const t1 = useTranslations('pages.settings.cookies');
  const t2 = useTranslations('global.status');
  const { show: showDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [isOperating, setIsOperating] = useState(false);
  const [cookies, setCookies] = useState<string[]>([]);

  const operatingTips = t1('status.operating');
  const operationOkTips = operatingTips + t2('success');
  const operationFailedTips = operatingTips + t2('error');

  const checkingTips = t1('status.checking');
  const validTips = checkingTips + t1('status.valid');
  const invalidTips = checkingTips + t1('status.invalid');

  const getCookies = useCallback(async () => {
    try {
      setIsLoading(true);
      const { list: cookies } = await weibo.listCookies();
      setCookies(cookies);
    } catch (err) {
      console.error(err);
      toast.error(t1('status.fetchFailed'));
    } finally {
      setIsLoading(false);
    }
  }, [t1]);

  const update = (idx: number) => {
    const cookie = cookies[idx];
    if (!cookie) return toast.error(t1('status.noInput'));

    setIsOperating(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        weibo
          .updateCookie(idx, cookie)
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
        error: (err: Error) => `${operationFailedTips}: ${err.message}`,
      }
    );
  };

  const check = (idx: number) => {
    const cookie = cookies[idx];
    if (!cookie) return toast.error(t1('status.noInput'));

    setIsOperating(true);
    toast.promise(
      new Promise<void>((resolve, reject) =>
        weibo
          .checkCookie(idx)
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
      content: t1('deleteConfirm.confirm'),
      onOk: () => {
        setIsOperating(true);
        toast.promise(
          new Promise<void>((resolve, reject) =>
            weibo
              .removeCookie(idx)
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
            error: (err: Error) => `${operationFailedTips}: ${err.message}`,
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
            <div key={idx} className="flex gap-4">
              <label htmlFor={`cookie-${idx}`} className="basis-20">
                Cookie #{idx + 1}
              </label>
              <Textarea
                id={`cookie-${idx}`}
                rows={4}
                value={cookie}
                placeholder={t1('addCookie.placeholder')}
                className="flex-1 resize-none break-all"
                onChange={e =>
                  setCookies(cookies => {
                    const newCookies = [...cookies];
                    newCookies[idx] = e.target.value;
                    return newCookies;
                  })
                }
              />
              <div className="flex flex-col gap-4">
                <Button size="sm" color="primary" onClick={() => update(idx)}>
                  <SaveIcon size={16} />
                  {t1('operation.save')}
                </Button>
                <Button size="sm" color="primary" onClick={() => check(idx)}>
                  <RadarIcon size={16} />
                  {t1('operation.check')}
                </Button>
                <Button
                  size="sm"
                  color="error"
                  onClick={() => remove(idx)}
                  disabled={cookies.length <= 1}
                >
                  <Trash2Icon size={16} />
                  {t1('operation.delete')}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <NoData className="justify-start" />
        )}
        <div className="bg-base-content/10 h-[1px]" />
        <AddCookies onAdded={getCookies}>
          <Button size="sm" color="primary">
            <PlusIcon size={16} />
            {t1('operation.add')}
          </Button>
        </AddCookies>
        {isOperating && (
          <div className="bg-base-100/80 absolute inset-0 !mt-0 h-full w-full" />
        )}
      </div>
    </MotionContainer>
  );
}
