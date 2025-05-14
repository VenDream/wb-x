/*
 * Menu icons
 *
 * @Author: VenDream
 * @Date: 2023-08-18 09:43:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { ROTNIcon, WeiboIcon } from '@/components/icons';
import type { PrimaryRouteKey } from '@/constants';
import {
  AudioLinesIcon,
  HouseIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

const ICONS: Record<PrimaryRouteKey, React.ReactNode> = {
  HOME: <HouseIcon size={18} />,
  WEIBO: <WeiboIcon size={18} />,
  ROTN: <ROTNIcon size={18} />,
  USERS: <UserIcon size={18} />,
  TRACKINGS: <AudioLinesIcon size={18} />,
  SETTINGS: <SettingsIcon size={18} />,
};

export default ICONS;
