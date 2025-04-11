/*
 * Debug Constants
 *
 * @Author: VenDream
 * @Date: 2023-11-28 16:43:59
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

const IS_DEBUG = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

export const FAKE_IMG = (
  seed: string | number = '1',
  width = 225,
  height = 400
) => {
  return IS_DEBUG
    ? `https://picsum.photos/seed/${seed}/${width}/${height}`
    : '';
};

export const FAKE_VIDEO = IS_DEBUG
  ? 'https://www.w3schools.com/html/mov_bbb.mp4'
  : '';

export const FAKE_POSTER = IS_DEBUG
  ? 'https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&dpr=1&w=690'
  : '';
