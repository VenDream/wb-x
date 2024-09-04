/*
 * useDialog hooks
 *
 * @Author: VenDream
 * @Date: 2024-08-19 15:41:54
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { useContext } from 'react';
import DialogCtx from './ctx';

export default function useDialog() {
  const ctx = useContext(DialogCtx);
  return ctx;
}
