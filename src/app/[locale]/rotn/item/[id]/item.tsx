/*
 * ROTN Item
 *
 * @Author: VenDream
 * @Date: 2023-10-20 11:22:53
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { IMG_PLACEHOLDER } from '@/contants';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface RotnItemProps {
  item: Backend.ROTNItem;
}

export default function RotnItem(props: RotnItemProps) {
  const { item } = props;
  const t = useTranslations('pages.rotn');

  return (
    <div className="rotn-item">
      <h1 className="text-lg">ROTN - No.{item.id}</h1>
      <p className="mt-4">{item.name}</p>
      <p className="mt-4 text-sm">
        {t('sourceURL')}：
        <Link href={item.url} target="_blank" className="link">
          {item.url}
        </Link>
      </p>
      <div className="image-list flex flex-col">
        {item.images.map((image, idx) => (
          <div key={idx} className="image-item">
            <Image
              autoSize
              src={IMG_PLACEHOLDER || image}
              alt="IMG"
              className="min-w-[40em] object-contain p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
