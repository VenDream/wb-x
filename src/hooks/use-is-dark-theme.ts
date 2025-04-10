/*
 * useIsDarkTheme
 *
 * @Author: VenDream
 * @Date: 2025-03-24 15:11:26
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import useTheme from '@/hooks/use-theme';
import { isDarkTheme } from '@/utils/theme';

export default function useIsDarkTheme() {
  const [theme] = useTheme();
  return isDarkTheme(theme);
}
