/*
 * Common Loading UI
 *
 * @Author: VenDream
 * @Date: 2023-09-28 14:33:27
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Loading } from '@/components/daisyui';

type LoadingProps = NonNullable<Parameters<typeof Loading>[0]> & {
  wrapperClassName?: string;
};

const defaultProps: LoadingProps = {
  color: 'primary',
  wrapperClassName: 'flex h-48 items-center justify-center',
};

export default function LoadingUI(props: LoadingProps) {
  const { wrapperClassName, ...loadingProps } = { ...defaultProps, ...props };

  return (
    <div className={wrapperClassName}>
      <Loading {...loadingProps} />
    </div>
  );
}
