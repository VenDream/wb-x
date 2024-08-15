/*
 * Cookies Settings
 *
 * @Author: VenDream
 * @Date: 2024-08-14 16:01:04
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import {
  appendCookie,
  checkCookie,
  listCookies,
  removeCookie,
  updateCookie,
} from '@/api/client';
import useDialog from '@/components/common/dialog/dialog';
import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import NoData from '@/components/common/no-data';
import { Button, Divider, Textarea } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { cx } from 'class-variance-authority';
import {
  CookieIcon,
  PlusIcon,
  RadarIcon,
  SaveIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function CookiesSettings() {
  const t = useTranslations('pages.settings.cookies');
  const { show: showDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookies] = useState<Backend.Cookie[]>([]);

  const newCookieRef = useRef('');
  const newCookieTextareaRef = useRef<HTMLTextAreaElement>(null);

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
    toast.promise(
      new Promise((resolve, reject) =>
        updateCookie(idx, cookie.value).then(resolve).catch(reject)
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
    toast.promise(
      new Promise<void>((resolve, reject) =>
        checkCookie(cookie.value)
          .then(data => {
            const { isValid } = data;
            isValid ? resolve() : reject();
          })
          .catch(reject)
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
      status: 'caution',
      title: t('deleteConfirm.title') + ' #' + (idx + 1),
      icon: <Trash2Icon size={20} className="mr-2" />,
      body: t('deleteConfirm.confirm'),
      onOk: () => {
        toast.promise(
          new Promise<void>((resolve, reject) =>
            removeCookie(idx)
              .then(() => {
                getCookies();
                resolve();
              })
              .catch(reject)
          ),
          {
            loading: operatingTips,
            success: operationOkTips,
            error: (err: Error) => operationFailedTips + ': ' + err.message,
          }
        );
      },
    });
  };

  const add = () => {
    newCookieRef.current = '';
    showDialog({
      status: 'info',
      title: t('addCookie.title'),
      icon: <CookieIcon size={20} className="mr-2" />,
      className: 'w-[36rem]',
      body: (
        <div className="p-1">
          <Textarea
            rows={4}
            ref={newCookieTextareaRef}
            className="no-scrollbar w-full resize-none break-all"
            onChange={e => {
              newCookieRef.current = e.target.value;
              newCookieTextareaRef.current?.classList.remove('textarea-error');
            }}
            placeholder={t('addCookie.placeholder')}
          />
        </div>
      ),
      onOk: () => {
        if (!newCookieRef.current) {
          newCookieTextareaRef.current?.focus();
          newCookieTextareaRef.current?.classList.add('textarea-error');
          return false;
        }
        toast.promise(
          new Promise<void>((resolve, reject) =>
            appendCookie(newCookieRef.current)
              .then(() => {
                getCookies();
                resolve();
              })
              .catch(reject)
          ),
          {
            loading: operatingTips,
            success: operationOkTips,
            error: (err: Error) => operationFailedTips + ': ' + err.message,
          }
        );
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
      <div className={cn('space-y-4 p-4')}>
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
                <Button size="sm" color="error" onClick={() => remove(idx)}>
                  <Trash2Icon size={16} />
                  {t('operation.delete')}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <NoData className="justify-start" />
        )}
        <Divider
          className={cx('before:h-[1px] after:h-[1px]', {
            '!mt-8': cookies.length > 0,
          })}
        />
        <Button size="sm" color="primary" onClick={add}>
          <PlusIcon size={16} />
          {t('operation.add')}
        </Button>
      </div>
    </MotionContainer>
  );
}
