/*
 * Menu icons
 *
 * @Author: VenDream
 * @Date: 2023-08-18 09:43:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { PrimaryRouteKey } from '@/contants';
import { ROTN_ICON, WEIBO_ICON } from '@/contants/svgs';
import {
  AudioLinesIcon,
  HouseIcon,
  // ScanSearchIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

const ICONS: Record<PrimaryRouteKey, React.ReactNode> = {
  HOME: <HouseIcon size={18} />,
  WEIBO: WEIBO_ICON,
  ROTN: ROTN_ICON,
  USER: <UserIcon size={18} />,
  TRACKINGS: <AudioLinesIcon size={18} />,
  // SCANNING: <ScanSearchIcon size={18} />,
  SETTINGS: <SettingsIcon size={18} />,
};

export default ICONS;
