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
import { Cog6ToothIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';

const ICONS: Record<keyof typeof MAIN_ROUTES, React.ReactNode> = {
  HOME: <HomeIcon />,
  WEIBO: WEIBO_ICON,
  ROTN: ROTN_ICON,
  USER: <UserIcon />,
  SETTINGS: <Cog6ToothIcon />,
};

export default ICONS;
