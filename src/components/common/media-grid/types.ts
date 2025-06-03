/*
 * Media Grid Types
 *
 * @Author: VenDream
 * @Date: 2025-05-16 15:22:11
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

export interface ImageItem {
  type: 'image';
  src: string;
  download: string;
  thumbnail: string;
  filename?: string;
}

export interface VideoItem {
  type: 'video';
  src: string;
  poster: string;
  asGif?: boolean;
  download: string;
  duration: number;
  filename?: string;
  aspectRatio: [number, number];
}

export type MediaGridItem = ImageItem | VideoItem;

export interface MediaGridProps {
  items: MediaGridItem[];
  cols?: 2 | 3 | 4 | 5;
  className?: string;
  showHasMoreIndicator?: boolean;
}
