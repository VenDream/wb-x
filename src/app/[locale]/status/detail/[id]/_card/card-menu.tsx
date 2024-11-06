/*
 * Weibo Status Card Header
 *
 * @Author: VenDream
 * @Date: 2023-11-29 10:19:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from '@/components/daisyui';
import {
  PRIMARY_ROUTES,
  SECONDARY_ROUTES,
  WEIBO_HOST,
  WEIBO_IMAGES_DOWNLOAD_API,
} from '@/contants';
import { WEIBO_ICON } from '@/contants/svgs';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { copyText } from '@/utils/common';
import {
  CopyIcon,
  EllipsisVerticalIcon,
  IdCardIcon,
  ImageDownIcon,
  MessageCircleMoreIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import CardCtx from './context';

const ALIGN_END_TRIGGER_W = 1450;

export default function CardMenu() {
  const cardCtx = useContext(CardCtx);
  const { status, isRetweet, menu, renderCustomMenus } = cardCtx;
  const { id, user, images } = status!;
  const t = useTranslations('pages.status.menu');
  const [alignEnd, setAlignEnd] = useState(false);

  const hasImages = images.length > 0;

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
    <Dropdown
      end={alignEnd}
      className={cn('absolute right-[14px]', {
        'top-[18px]': isRetweet,
        'top-[35px]': !isRetweet,
      })}
    >
      <DropdownToggle button={false}>
        <Button
          size="sm"
          color="ghost"
          className="h-[2.1rem] w-[2.1rem] rounded-full p-0"
        >
          <EllipsisVerticalIcon size={20} />
        </Button>
      </DropdownToggle>
      <DropdownMenu
        className={cn(
          'z-20 mt-2 w-[190px] rounded border border-base-content/10',
          'bg-base-100/50 backdrop-blur will-change-transform'
        )}
      >
        {!!menu.copyId && (
          <DropdownItem anchor={false}>
            <span
              className="rounded p-2"
              onClick={() => {
                copyText(id);
                toast.success(t('copySuccessTips'));
              }}
            >
              <CopyIcon size={16} className="!stroke-2" />
              {t('copyID')}
            </span>
          </DropdownItem>
        )}
        {!!menu.copyUid && (
          <DropdownItem anchor={false}>
            <span
              className="rounded p-2"
              onClick={() => {
                copyText(user.id);
                toast.success(t('copySuccessTips'));
              }}
            >
              <IdCardIcon size={16} className="!stroke-2" />
              {t('copyUID')}
            </span>
          </DropdownItem>
        )}
        {!!menu.viewOriginal && (
          <DropdownItem anchor={false}>
            <Link
              target="_blank"
              rel="noreferrer"
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
              <ImageDownIcon size={16} className="!stroke-2" />
              {t('download')}
            </a>
          </DropdownItem>
        )}
        {!!menu.viewComments && (
          <DropdownItem anchor={false}>
            <Link
              target="_blank"
              className="rounded p-2"
              href={`${SECONDARY_ROUTES.STATUS_DETAIL}/${id}#comments`}
            >
              <MessageCircleMoreIcon size={16} className="!stroke-2" />
              {t('comments')}
            </Link>
          </DropdownItem>
        )}
        {!!menu.viewOpPosts && (
          <DropdownItem anchor={false}>
            <Link
              target="_blank"
              className="rounded p-2"
              href={`${PRIMARY_ROUTES.WEIBO}?uid=${user.id}`}
            >
              <SquareArrowOutUpRightIcon size={16} className="!stroke-2" />
              {t('opPosts')}
            </Link>
          </DropdownItem>
        )}
        {renderCustomMenus && renderCustomMenus(cardCtx)}
      </DropdownMenu>
    </Dropdown>
  );
}
