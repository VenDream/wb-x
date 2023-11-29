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
import { WEIBO_HOST } from '@/contants';
import { Link } from '@/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface CardHeaderProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardMenu(props: CardHeaderProps) {
  const { isRetweet } = props;
  const { id } = props.status;
  const t = useTranslations('pages.status.menu');
  const className = clsx('status-menu absolute right-[14px]', {
    'top-[20px]': isRetweet,
    'top-[35px]': !isRetweet,
  });

  return (
    <Dropdown className={className}>
      <DropdownToggle button={false}>
        <Button size="sm" color="ghost">
          · · ·
        </Button>
      </DropdownToggle>
      <DropdownMenu className="border-regular-5 z-10 mt-2 w-40 rounded">
        <DropdownItem anchor={false}>
          <Link
            target="_blank"
            className="rounded px-2 py-1"
            href={`${WEIBO_HOST}/detail/${id}`}
          >
            {t('source')}
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
