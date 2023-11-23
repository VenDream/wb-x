'use client';

/*
 * ROTN Item detail modal
 *
 * @Author: VenDream
 * @Date: 2023-10-20 11:37:45
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import RotnItem from '@/app/[locale]/rotn/item/[id]/item';
import { ModalBody, ModalLegacy } from '@/components/daisyui';
import { useRouter } from '@/navigation';

interface RotnItemDetailModalProps {
  item: Backend.ROTNItem;
}

export default function RotnItemDetailModal(props: RotnItemDetailModalProps) {
  const { item } = props;
  const router = useRouter();

  return (
    <ModalLegacy
      open
      onClickBackdrop={router.back}
      className="rotn-item-modal h-5/6 w-3/4 max-w-5xl rounded-sm !p-2"
    >
      <ModalBody className="h-full">
        <RotnItem item={item} hideBreadcrumbs />
      </ModalBody>
    </ModalLegacy>
  );
}
