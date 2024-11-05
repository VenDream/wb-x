'use server';

/*
 * Server actions
 *
 * @Author: VenDream
 * @Date: 2024-02-04 10:51:49
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import { revalidateTag } from 'next/cache';

export async function refreshDbInfo() {
  revalidateTag('db-info');
}

export async function refreshTrackingUsers() {
  revalidateTag('tracking-users');
}
