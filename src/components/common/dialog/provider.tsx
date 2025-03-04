'use client';

/*
 * Dialog Provider
 *
 * @Author: VenDream
 * @Date: 2024-08-19 11:34:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { generateId } from '@/utils/id';
import { produce } from 'immer';
import { useTranslations } from 'next-intl';
import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import DialogContainer from './container';
import DialogCtx from './ctx';
import type { DialogContext, DialogInstance, DialogProps } from './types';

export default function DialogProvider(props: PropsWithChildren) {
  const t = useTranslations();
  const { children } = props;
  const [instances, setInstances] = useState<DialogInstance[]>([]);

  const update = useCallback((id: string, patch: Partial<DialogProps>) => {
    setInstances(instances => {
      const idx = instances.findIndex(i => i.id === id);
      if (idx === -1) return instances;
      const newInstances = produce(instances, draft => {
        const { props } = draft[idx];
        if (patch.open === false) {
          draft.splice(idx, 1);
        } else {
          Object.assign(props, patch);
        }
      });
      return newInstances;
    });
  }, []);

  const close = useCallback(
    (id: string) => {
      update(id, { open: false });
    },
    [update]
  );

  const closeTop = useCallback(() => {
    const top = instances.findLast(i => i.props.open);
    if (!top) return;
    close(top.id);
  }, [close, instances]);

  const closeAll = useCallback(() => {
    instances.forEach(i => close(i.id));
  }, [close, instances]);

  const show = useCallback(
    (props: DialogProps) => {
      const id = generateId(6);
      setInstances(instances => {
        const instance: DialogInstance = {
          id,
          props: {
            ...props,
            open: true,
            disposable: true,
            onOpenChange: (open: boolean) => update(id, { open }),
          },
          close: () => close(id),
          update: props => update(id, props),
        };
        return [...instances, instance];
      });
      return id;
    },
    [close, update]
  );

  const ctx: DialogContext = useMemo(
    () => ({ show, update, close, closeTop, closeAll, instances }),
    [closeAll, close, closeTop, instances, show, update]
  );

  return (
    <DialogCtx.Provider value={ctx}>
      {children}
      <DialogContainer />
    </DialogCtx.Provider>
  );
}
