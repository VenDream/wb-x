/*
 * Twitter Tweet Videos
 *
 * @Author: VenDream
 * @Date: 2025-05-16 15:06:33
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import MediaGrid, { type VideoItem } from '@/components/common/media-grid';
import { getFileName } from '@/utils/common';
import { getImageVariants, getProxiedVideoUrl } from '@/utils/twitter';
import { useContext, useMemo } from 'react';
import { CardCtx } from './context';

export default function CardVideos() {
  const { tweet, isComment } = useContext(CardCtx);
  const { videos } = tweet as Twitter.Tweet;

  const videoItems = useMemo(() => {
    return videos.map<VideoItem>(video => {
      return {
        type: 'video',
        asGif: video.duration === 0,
        src: getProxiedVideoUrl(video.url),
        download: getProxiedVideoUrl(video.url),
        poster: getImageVariants(video.cover).md,
        duration: video.duration,
        filename: getFileName(video.url),
        aspectRatio: video.aspectRatio,
      };
    });
  }, [videos]);

  return (
    <MediaGrid
      cols={isComment ? 4 : 3}
      items={videoItems}
      showHasMoreIndicator
    />
  );
}
