/*
 * Twitter Card Icons
 *
 * @Author: VenDream
 * @Date: 2025-05-16 10:06:47
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { AndroidIcon, IosIcon, WebIcon } from '@/components/icons';

/**
 * get tweet source icon
 *
 * @export
 * @param {string} source source
 */
export function getSourceIcon(source: string) {
  switch (source) {
    case 'Twitter Web App':
    case 'Twitter Web Client':
      return <WebIcon size={16} />;
    case 'Twitter for Android':
      return <AndroidIcon size={16} />;
    case 'Twitter for iPhone':
    case 'Twitter for iPad':
      return <IosIcon />;
    default:
      return <WebIcon size={16} />;
  }
}
