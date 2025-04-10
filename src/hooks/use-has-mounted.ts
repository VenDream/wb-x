/*
 * useHasMounted
 *
 * @Author: VenDream
 * @Date: 2025-04-10 13:54:23
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { useEffect, useState } from 'react';

export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
