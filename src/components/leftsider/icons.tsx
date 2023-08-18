/*
 * Menu icons
 *
 * @Author: VenDream
 * @Date: 2023-08-18 09:43:55
 *
 * Copyright © 2014-2023 VenDream. All Rights Reserved.
 */

import { ROUTES } from '@/contants';
import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';

const ICONS: Record<keyof typeof ROUTES, React.ReactNode> = {
  HOME: <HomeIcon />,
  SETTINGS: <Cog6ToothIcon />,
};

export default ICONS;
