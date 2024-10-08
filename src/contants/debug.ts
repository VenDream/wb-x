/*
 * Debug Constants
 *
 * @Author: VenDream
 * @Date: 2023-11-28 16:43:59
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

const IS_DEBUG = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

export const FAKE_IMG = (idx = 0) =>
  IS_DEBUG ? `https://picsum.photos/seed/${idx + 1}/200/200` : '';

export const FAKE_VIDEO = IS_DEBUG
  ? 'https://player.vimeo.com/external/372335193.sd.mp4?s=80151fa22b2eba81883c8641f2c9e493762c7357&profile_id=164&oauth2_token_id=57447761'
  : '';

export const FAKE_POSTER = IS_DEBUG
  ? 'https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&dpr=1&w=690'
  : '';
