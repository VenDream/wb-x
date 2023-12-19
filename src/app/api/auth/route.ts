/*
 * Authentication
 *
 * @Author: VenDream
 * @Date: 2023-12-19 18:00:18
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

export async function GET(request: Request) {
  return new Response('Authentication Required!', {
    status: 401,
    headers: {
      'WWW-Authenticate': "Basic realm='private_pages'",
    },
  });
}
