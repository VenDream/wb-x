'use client';

/*
 * Error Handler
 *
 * @Author: VenDream
 * @Date: 2023-08-30 14:02:40
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

// import useToast from '@/components/common/toast';
import { Button } from '@/components/daisyui';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('global');
  // const { showErrorTips } = useToast();

  useEffect(() => {
    console.error(error);
    // showErrorTips(error.message);
  }, [error /** showErrorTips */]);

  return (
    <div className="flex max-h-full min-h-[10rem] flex-col items-center justify-center text-error">
      <div className="flex items-center text-lg">
        <XCircleIcon className="mr-1 h-6 w-6" />
        {t('misc.systemDown')} :(
      </div>
      <Button
        size="sm"
        color="error"
        onClick={() => reset()}
        className="btn-outline mt-4 min-w-[5rem]"
      >
        {t('action.retry')}
      </Button>
    </div>
  );
}
