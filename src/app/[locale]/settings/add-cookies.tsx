/*
 * Add Cookies Dialog
 *
 * @Author: VenDream
 * @Date: 2024-09-04 15:47:39
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { appendCookie } from '@/api/client';
import { Dialog } from '@/components/common/dialog';
import { Textarea } from '@/components/daisyui/index2';
import { CookieIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type PropsWithChildren, useRef, useState } from 'react';
import { toast } from 'sonner';

interface IProps extends PropsWithChildren {
  onAdded?: () => void | Promise<void>;
}

export default function AddCookiesDialog(props: IProps) {
  const t1 = useTranslations('pages.settings.cookies');
  const t2 = useTranslations('global.status');

  const operatingTips = t1('status.operating');
  const operationOkTips = operatingTips + t2('success');
  const operationFailedTips = operatingTips + t2('error');

  const [isAdding, setIsAdding] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cookies, setCookies] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [isNewCookiesValid, setIsNewCookiesValid] = useState(true);

  const add = () => {
    if (cookies.trim() === '') {
      setCookies('');
      setIsNewCookiesValid(false);
      textareaRef.current?.focus();
      return;
    }

    setIsAdding(true);

    toast.promise(
      new Promise<void>((resolve, reject) =>
        appendCookie(cookies)
          .then(() => {
            resolve();
            setCookies('');
            setOpenAddDialog(false);
            props.onAdded?.();
          })
          .catch(reject)
          .finally(() => {
            setIsAdding(false);
          })
      ),
      {
        loading: operatingTips,
        success: operationOkTips,
        error: (err: Error) => `${operationFailedTips}: ${err.message}`,
      }
    );
  };

  return (
    <Dialog
      open={openAddDialog}
      onOpenChange={setOpenAddDialog}
      classNames={{
        wrapper: 'w-[36rem]',
        scrollArea: 'p-1',
      }}
      loading={isAdding}
      onOk={add}
      onCancel={() => {
        setCookies('');
        setIsNewCookiesValid(true);
      }}
    >
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <Dialog.Title>
        <CookieIcon size={18} className="mr-2 !stroke-2" />
        {t1('addCookie.title')}
      </Dialog.Title>
      <Dialog.Content>
        <Textarea
          ref={textareaRef}
          rows={4}
          color={!isNewCookiesValid ? 'error' : undefined}
          readOnly={isAdding}
          className="w-full resize-none break-all"
          value={cookies}
          onChange={e => {
            setCookies(e.target.value);
            setIsNewCookiesValid(true);
          }}
          placeholder={t1('addCookie.placeholder')}
        />
      </Dialog.Content>
    </Dialog>
  );
}
