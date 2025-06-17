/*
 * Weibo Status Video
 *
 * @Author: VenDream
 * @Date: 2023-11-28 14:08:49
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { weibo } from '@/api/client';
import { type Slide, useLightbox } from '@/components/common/lightbox';
import { PlayIcon } from '@/components/icons';
import { FAKE_POSTER, FAKE_VIDEO } from '@/constants/debug';
import { useIsMobile } from '@/hooks/use-media-query';
import { cn } from '@/utils/classnames';
import { getImageVariants, getProxiedVideoUrl } from '@/utils/weibo';
import { LoaderCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import CardCtx from './context';

const WIDTH = 1280 * 0.8;

export default function CardVideo() {
  const isMobile = useIsMobile();
  const { status } = useContext(CardCtx);
  const t = useTranslations('pages.status.video');

  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const { openLightbox, renderLightbox } = useLightbox();

  const posterClass = cn(
    'relative flex items-center justify-center',
    'aspect-video rounded-sm shadow-xs',
    'before:absolute before:top-0 before:left-0 before:bg-black/30',
    'before:content-[""], before:w-full before:h-full before:rounded'
  );

  if (!status || !status.video) return null;

  const { title, cover } = status.video;
  const { sm, md } = getImageVariants(cover);
  const poster = isMobile ? sm : md;

  const fetchVideoSrc = async (callback: () => void) => {
    try {
      setIsLoading(true);
      const src = await weibo.getStatusVideo(status.id);
      const proxiedVideoUrl = getProxiedVideoUrl(src);
      const video: Slide = {
        type: 'video',
        width: WIDTH,
        height: WIDTH / (16 / 9),
        poster: FAKE_POSTER || poster,
        download: proxiedVideoUrl,
        title: (
          <p className="h-[2rem] text-sm leading-[2rem] font-normal">
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
    <div className="cursor-pointer" onClick={previewVideo}>
      <div
        className={posterClass}
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("${FAKE_POSTER || poster}")`,
        }}
      >
        {isLoading ? (
          <LoaderCircleIcon size={30} className="animate-spin" />
        ) : (
          <PlayIcon size={50} className="z-10 text-white/80" />
        )}
      </div>
      {renderLightbox({ slides })}
    </div>
  );
}
