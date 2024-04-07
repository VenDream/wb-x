/*
 * Unauthorized Response
 *
 * @Author: VenDream
 * @Date: 2023-12-19 18:00:18
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  console.log('hhhh');
  return NextResponse.json(
    {
      code: 401,
      errormsg: 'Unauthorized',
      data: null,
    },
    {
      status: 401,
    }
  );
}

export const revalidate = 0;
