/*
 * Code auto-fixing
 *
 * @Author: VenDream
 * @Date: 2023-06-01 16:31:04
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { execSync } from 'child_process';

execSync('eslint --ext .js,.jsx,.ts,.tsx ./ --cache --quiet --fix', {
  stdio: 'inherit',
});

execSync(
  'prettier --write "**/*.{css,scss,sass,js,jsx,ts,tsx,json,yml,yaml,md}"',
  {
    stdio: 'inherit',
  }
);
