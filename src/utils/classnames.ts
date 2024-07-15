/*
 * classnames utils
 *
 * @Author: VenDream
 * @Date: 2024-07-15 11:45:11
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
