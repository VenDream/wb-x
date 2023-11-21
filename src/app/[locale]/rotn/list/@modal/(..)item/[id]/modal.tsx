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
import { ModalBody, ModalHeader, ModalLegacy } from '@/components/daisyui';
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
      style={{ scrollbarGutter: 'stable' }}
      className="rotn-item-modal h-3/4 w-3/4 max-w-5xl overflow-auto rounded-md"
    >
      <ModalBody>
        <RotnItem
          item={item}
          title={<ModalHeader>ROTN - No.{item.id}</ModalHeader>}
        />
      </ModalBody>
    </ModalLegacy>
  );
}
