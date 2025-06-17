/*
 * Refresh Button
 *
 * @Author: VenDream
 * @Date: 2025-06-17 11:09:33
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { Button } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { RefreshCcwIcon } from 'lucide-react';
interface IProps {
  /** reset filter params */
  resetFilterParams: () => void;
}

export default function Refresh(props: IProps) {
  const { resetFilterParams } = props;

  return (
    <Button
      circle
      onClick={resetFilterParams}
      className={cn(
        'fixed right-5 bottom-18 h-10 w-10 shadow-xs lg:right-15 lg:bottom-15'
      )}
    >
      <RefreshCcwIcon size={18} />
    </Button>
  );
}
