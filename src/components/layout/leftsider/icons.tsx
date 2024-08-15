/*
 * Menu icons
 *
 * @Author: VenDream
 * @Date: 2023-08-18 09:43:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { MAIN_ROUTES } from '@/contants';
import { ROTN_ICON, WEIBO_ICON } from '@/contants/svgs';
import { HouseIcon, SettingsIcon, UserIcon } from 'lucide-react';

const ICONS: Record<keyof typeof MAIN_ROUTES, React.ReactNode> = {
  HOME: <HouseIcon size={18} />,
  WEIBO: WEIBO_ICON,
  ROTN: ROTN_ICON,
  USER: <UserIcon size={18} />,
  SETTINGS: <SettingsIcon size={18} />,
};

export default ICONS;
