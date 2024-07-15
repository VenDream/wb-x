/*
 * Weibo Status Video
 *
 * @Author: VenDream
 * @Date: 2023-11-28 14:08:49
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { getDbStatusVideo } from '@/api/client';
import { Slide, useLightbox } from '@/components/common/lightbox';
import { FAKE_POSTER, FAKE_VIDEO } from '@/contants/debug';
import { getImageVariants, getProxiedVideoUrl } from '@/utils/weibo';
import { PlayIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import CardCtx from './context';

const WIDTH = 1280 * 0.8;

export default function CardVideo() {
  const { status } = useContext(CardCtx);
  const t = useTranslations('pages.status.video');

  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const { openLightbox, renderLightbox } = useLightbox();

  const posterClass = twMerge(
    'relative flex items-center justify-center',
    'aspect-video rounded shadow-sm',
    'before:absolute before:top-0 before:left-0 before:bg-black/30',
    'before:content-[""], before:w-full before:h-full before:rounded'
  );

  if (!status || !status.video) return null;

  const { title, cover } = status.video;
  const { md: poster } = getImageVariants(cover);

  const fetchVideoSrc = async (callback: () => void) => {
    try {
      setIsLoading(true);
      const src = await getDbStatusVideo(status.id);
      const proxiedVideoUrl = getProxiedVideoUrl(src);
      const video: Slide = {
        type: 'video',
        width: WIDTH,
        height: WIDTH / (16 / 9),
        poster: FAKE_POSTER || poster,
        title: (
          <p className="h-[2rem] text-sm font-normal leading-[2rem]">
            {title}.mp4
          </p>
        ),
        sources: [
          {
            src: FAKE_VIDEO || proxiedVideoUrl,
            type: 'video/mp4',
          },
        ],
      };
      setSlides([video]);
      callback();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error(t('fetchFailed'));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const previewVideo = async () => {
    if (slides.length > 0) {
      return openLightbox();
    }
    await fetchVideoSrc(openLightbox);
  };

  return (
    <div
      className="status-video mt-4 cursor-pointer pr-16"
      onClick={previewVideo}
    >
      <div
        className={posterClass}
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("${FAKE_POSTER || poster}")`,
        }}
      >
        {isLoading ? (
          <div className="loading w-[2rem] text-white/90" />
        ) : (
          <PlayIcon className="z-[1] h-12 w-12 text-white/90" />
        )}
      </div>
      {renderLightbox({ slides })}
    </div>
  );
}
