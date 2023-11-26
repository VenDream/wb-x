/*
 * ROTN Item
 *
 * @Author: VenDream
 * @Date: 2023-10-20 11:22:53
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { Breadcrumbs, BreadcrumbsItem } from '@/components/daisyui';
import { MAIN_ROUTES } from '@/contants';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface RotnItemProps {
  item: Backend.ROTNItem;
  hideBreadcrumbs?: boolean;
}

export default function RotnItem(props: RotnItemProps) {
  const { item, hideBreadcrumbs } = props;
  const t1 = useTranslations('pages.rotn');
  const t2 = useTranslations('global.pages');

  if (item.images.length <= 0) return null;

  return (
    <div className="rotn-item flex h-full flex-1 flex-col">
      {hideBreadcrumbs ? (
        <p className="mb-2 rounded bg-base-200 p-2">
          {item.type} - {item.id} - {item.name}
        </p>
      ) : (
        <Breadcrumbs className="mb-4 rounded bg-base-200 px-2">
          <BreadcrumbsItem>
            <Link href={MAIN_ROUTES.ROTN}>{t2('rotn')}</Link>
          </BreadcrumbsItem>
          <BreadcrumbsItem>
            {item.type} - {item.id}
          </BreadcrumbsItem>
        </Breadcrumbs>
      )}
      <div
        className="flex-1 overflow-auto px-2"
        style={{ scrollbarGutter: 'stable' }}
      >
        {!hideBreadcrumbs && <p className="mt-4">{item.name}</p>}
        <p className="mt-4 text-sm">
          {t1('sourceURL')}：
          <Link href={item.url} target="_blank" className="link">
            {item.url}
          </Link>
        </p>
        <div className="image-list mt-4 flex flex-col items-center gap-4">
          {item.images.map((image, idx) => (
            <div key={idx} className="image-item">
              <Image
                autoSize
                src={image}
                alt="IMG"
                className="border-redular-50 min-w-[10em] max-w-[56.25em] rounded object-contain p-1 shadow"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
