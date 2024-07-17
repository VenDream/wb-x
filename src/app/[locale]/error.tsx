'use client';

/*
 * Error Handler
 *
 * @Author: VenDream
 * @Date: 2023-08-30 14:02:40
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button } from '@/components/daisyui';
import { CircleXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('global');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex max-h-full min-h-[10rem] flex-col items-center justify-center text-error">
      <div className="flex items-center text-lg">
        <CircleXIcon size={20} className="mr-2" />
        {t('misc.systemDown')} :(
      </div>
      <Button
        size="sm"
        color="error"
        onClick={() => reset()}
        className="mt-4 min-w-[5rem] text-white"
      >
        {t('action.retry')}
      </Button>
    </div>
  );
}
