/*
 * Dialog Container
 *
 * @Author: VenDream
 * @Date: 2024-08-19 13:55:08
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import DialogCtx from './ctx';
import Dialog from './dialog';

export default function DialogContainer() {
  const { instances } = useContext(DialogCtx);

  return (
    <AnimatePresence>
      {instances.map(instance => (
        <Dialog key={instance.id} {...instance.props} />
      ))}
    </AnimatePresence>
  );
}
