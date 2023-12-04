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
import { WEIBO_HOST, WEIBO_IMAGES_DOWNLOAD_API } from '@/contants';
import { WEIBO_ICON } from '@/contants/svgs';
import { Link } from '@/navigation';
import {
  EllipsisHorizontalCircleIcon,
  FolderArrowDownIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface CardHeaderProps {
  status: Backend.Status;
  isRetweet?: boolean;
}

export default function CardMenu(props: CardHeaderProps) {
  const { status, isRetweet } = props;
  const { id } = props.status;
  const t = useTranslations('pages.status.menu');

  const hasImages = status.images.length > 0;
  const className = clsx('status-menu absolute right-[14px]', {
    'top-[20px]': isRetweet,
    'top-[35px]': !isRetweet,
  });

  return (
    <Dropdown className={className}>
      <DropdownToggle button={false}>
        <Button size="sm" color="ghost">
          <EllipsisHorizontalCircleIcon className="h-5 w-5" />
        </Button>
      </DropdownToggle>
      <DropdownMenu className="border-regular-5 z-10 mt-2 w-[185px] rounded">
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
        {hasImages && (
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
      </DropdownMenu>
    </Dropdown>
  );
}
