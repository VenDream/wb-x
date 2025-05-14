/*
 * User List Filter
 *
 * @Author: VenDream
 * @Date: 2025-05-14 11:30:09
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button, Dropdown, Toggle } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IProps {
  isTracking: boolean;
  onToggleTracking: (isTracking: boolean) => void;
}

export default function Filter(props: IProps) {
  const { isTracking, onToggleTracking } = props;
  const t = useTranslations('pages.users');

  return (
    <Dropdown align="center">
      <Dropdown.Toggle>
        <Button
          size="sm"
          ghost={!isTracking}
          color={isTracking ? 'primary' : undefined}
          className={cn({ 'bg-base-content/10': !isTracking })}
        >
          <SlidersHorizontalIcon className="size-4" />
        </Button>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={cn(
          'mt-2 w-48 p-4',
          'bg-base-100/50 border-base-content/10 border backdrop-blur-lg'
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <span className="text-sm">{t('isTracking')}</span>
          <Toggle
            color="primary"
            checked={isTracking}
            onChange={() => onToggleTracking(!isTracking)}
          />
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
