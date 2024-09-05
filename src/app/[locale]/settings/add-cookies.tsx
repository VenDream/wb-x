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
import { Button, Textarea } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { CookieIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface IProps {
  onAdded?: () => void | Promise<void>;
}

export default function AddCookiesDialog(props: IProps) {
  const t = useTranslations('pages.settings.cookies');
  const operatingTips = t('status.operating');
  const operationOkTips = operatingTips + t('status.ok');
  const operationFailedTips = operatingTips + t('status.failed');

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
        error: (err: Error) => operationFailedTips + ': ' + err.message,
      }
    );
  };

  return (
    <Dialog
      open={openAddDialog}
      onOpenChange={setOpenAddDialog}
      wrapperClassName="w-[36rem]"
      scrollAreaClassName="p-1"
      loading={isAdding}
      onOk={add}
      onCancel={() => {
        setCookies('');
        setIsNewCookiesValid(true);
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          color="primary"
          onClick={() => setOpenAddDialog(true)}
        >
          <PlusIcon size={16} />
          {t('operation.add')}
        </Button>
      </Dialog.Trigger>
      <Dialog.Title>
        <CookieIcon size={18} className="mr-2 !stroke-2" />
        {t('addCookie.title')}
      </Dialog.Title>
      <Dialog.Content>
        <Textarea
          ref={textareaRef}
          rows={4}
          disabled={isAdding}
          className={cn('no-scrollbar w-full resize-none break-all', {
            'textarea-error': !isNewCookiesValid,
          })}
          value={cookies}
          onChange={e => {
            setCookies(e.target.value);
            setIsNewCookiesValid(true);
          }}
          placeholder={t('addCookie.placeholder')}
        />
      </Dialog.Content>
    </Dialog>
  );
}
