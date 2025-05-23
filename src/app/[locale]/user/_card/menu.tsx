/*
 * User Card Menu
 *
 * @Author: VenDream
 * @Date: 2025-05-19 11:22:17
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button, Dropdown } from '@/components/daisyui';
import { PRIMARY_ROUTES } from '@/constants';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/classnames';
import { copyText } from '@/utils/common';
import {
  CircleEllipsisIcon,
  CopyIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface IProps {
  platform: Platform;
  user: Weibo.User | Twitter.User;
}

export default function CardMenu(props: IProps) {
  const { platform, user } = props;

  const t = useTranslations('pages.users.menu');

  const isWeibo = platform === 'weibo';

  const listLink = isWeibo
    ? `${PRIMARY_ROUTES.WEIBO}?uid=${user.id}`
    : `${PRIMARY_ROUTES.TWITTER}?uid=${user.id}`;

  return (
    <Dropdown align="center">
      <Dropdown.Toggle>
        <Button
          ghost
          size="xs"
          className="bg-base-content/10 border-base-content/10"
        >
          <CircleEllipsisIcon size={16} />
          {t('more')}
        </Button>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={cn(
          'border-base-content/10 z-20 mt-2 w-[190px] rounded-sm border',
          'bg-base-100/50 backdrop-blur-lg will-change-transform'
        )}
      >
        <Dropdown.Item>
          <span
            className="rounded-sm p-2 text-xs"
            onClick={() => {
              copyText(user.id);
              toast.success(t('copySuccessTips'));
              (document.activeElement as HTMLDivElement)?.blur();
            }}
          >
            <CopyIcon size={14} />
            {t('copyUID')}
          </span>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link
            target="_blank"
            className="rounded-sm p-2 text-xs"
            href={listLink}
          >
            <SquareArrowOutUpRightIcon size={14} />
            {isWeibo ? t('wbPosts') : t('twPosts')}
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
