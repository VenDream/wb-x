/*
 * Code linting
 *
 * @Author: VenDream
 * @Date: 2023-06-01 16:40:25
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { execSync } from 'child_process';
import pc from 'picocolors';

execSync('tsc --project ./tsconfig.json --noEmit', { stdio: 'inherit' });
console.log(pc.green('✔ No Tsc warnings or errors'));
execSync('next lint', { stdio: 'inherit' });
