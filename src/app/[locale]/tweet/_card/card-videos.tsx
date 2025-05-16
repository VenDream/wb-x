/*
 * Twitter Tweet Videos
 *
 * @Author: VenDream
 * @Date: 2025-05-16 15:06:33
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import MediaGrid, { type VideoItem } from '@/components/common/media-grid';
import { useContext, useMemo } from 'react';
import CardCtx from './context';

export default function CardVideos() {
  const { tweet } = useContext(CardCtx);
  const { videos } = tweet as Twitter.Tweet;

  const videoItems = useMemo(() => {
    return videos.map<VideoItem>(video => {
      return {
        type: 'video',
        src: video.url,
        download: video.url,
        poster: video.cover,
        duration: video.duration,
        aspectRatio: video.aspectRatio,
      };
    });
  }, [videos]);

  return <MediaGrid cols={3} items={videoItems} showHasMoreIndicator />;
}
