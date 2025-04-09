/*
 * Code linting
 *
 * @Author: VenDream
 * @Date: 2023-06-01 16:40:25
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { execSync } from 'node:child_process';
import pc from 'picocolors';

execSync('tsc --project ./tsconfig.json --noEmit || exit 1', {
  stdio: 'inherit',
});
console.log(pc.green('✔ No Tsc warnings or errors'));
execSync(
  'prettier --list-different "src/**/*.{css,js,jsx,ts,tsx,json,yml,yaml,md}" || exit 1',
  { stdio: 'inherit' }
);
console.log(pc.green('✔ No Prettier warnings or errors'));
execSync('next lint || exit 1', { stdio: 'inherit' });
