/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-29 10:19:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import useToast from '@/components/common/toast';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '@/components/daisyui';
import {
  SECONDARY_ROUTES,
  WEIBO_HOST,
  WEIBO_IMAGES_DOWNLOAD_API,
} from '@/contants';
import { WEIBO_ICON } from '@/contants/svgs';
import { Link } from '@/navigation';
import { copyText } from '@/utils/common';
import {
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  FolderArrowDownIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useContext, useEffect, useState } from 'react';
import CardCtx from './context';

const ALIGN_END_TRIGGER_W = 1450;

export default function CardMenu() {
  const { status, isRetweet, menu } = useContext(CardCtx);
  const { id, user, images } = status!;
  const t = useTranslations('pages.status.menu');
  const { showSuccessTips } = useToast();
  const [alignEnd, setAlignEnd] = useState(false);

  const hasImages = images.length > 0;
  const className = clsx('status-menu absolute right-[14px]', {
    'top-[20px]': isRetweet,
    'top-[35px]': !isRetweet,
  });

  const refreshAlignment = useCallback(() => {
    const w = window.innerWidth;
    setAlignEnd(w <= ALIGN_END_TRIGGER_W);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', refreshAlignment);
    refreshAlignment();
    return () => {
      window.removeEventListener('resize', refreshAlignment);
    };
  }, [refreshAlignment]);

  if (user.id === '-1') return null;

  return (
    <Dropdown end={alignEnd} className={className}>
      <DropdownToggle button={false}>
        <Button size="sm" color="ghost">
          <EllipsisHorizontalCircleIcon className="h-5 w-5" />
        </Button>
      </DropdownToggle>
      <DropdownMenu className="border-regular-5 z-10 mt-2 w-[185px] rounded">
        {!!menu.copyUid && (
          <DropdownItem anchor={false}>
            <span
              className="rounded p-2"
              onClick={() => {
                copyText(user.id);
                showSuccessTips(t('copySuccessTips'));
              }}
            >
              <ClipboardDocumentListIcon />
              {t('copyUID')}
            </span>
          </DropdownItem>
        )}
        {!!menu.viewOriginal && (
          <DropdownItem anchor={false}>
            <Link
              target="_blank"
              className="rounded p-2"
              href={`${WEIBO_HOST}/detail/${id}`}
            >
              {WEIBO_ICON}
              {t('source')}
            </Link>
          </DropdownItem>
        )}
        {!!menu.dlImages && hasImages && (
          <DropdownItem anchor={false}>
            <a
              target="_blank"
              className="rounded p-2"
              href={`${WEIBO_IMAGES_DOWNLOAD_API}&id=${id}`}
            >
              <FolderArrowDownIcon />
              {t('download')}
            </a>
          </DropdownItem>
        )}
        {!!menu.viewComments && (
          <DropdownItem anchor={false}>
            <Link
              target="_blank"
              className="rounded p-2"
              href={`${SECONDARY_ROUTES.STATUS_DETAIL}/${id}`}
            >
              <ChatBubbleLeftIcon />
              {t('comments')}
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
