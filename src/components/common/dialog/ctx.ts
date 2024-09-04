'use client';

/*
 * Dialog Context
 *
 * @Author: VenDream
 * @Date: 2024-08-19 11:09:54
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import React from 'react';
import { DialogContext } from './types';

const DialogCtx = React.createContext<DialogContext>({
  instances: [],
  show: () => '',
  close: () => {},
  update: () => {},
  closeTop: () => {},
  closeAll: () => {},
});

export default DialogCtx;
