/*
 * Menu icons
 *
 * @Author: VenDream
 * @Date: 2023-08-18 09:43:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { ROUTES } from '@/contants';
import { Cog6ToothIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';

const ICONS: Record<keyof typeof ROUTES, React.ReactNode> = {
  HOME: <HomeIcon />,
  USERS: <UserIcon />,
  SETTINGS: <Cog6ToothIcon />,
};

export default ICONS;
