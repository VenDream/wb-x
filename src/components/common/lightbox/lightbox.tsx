/*
 * Image Preview Lightbox
 *
 * @Author: VenDream
 * @Date: 2023-11-27 10:26:08
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import LightboxComponent, {
  AnimationSettings,
  CarouselSettings,
  LightboxExternalProps,
  LightboxProps,
  Plugin,
} from 'yet-another-react-lightbox';

import Captions from 'yet-another-react-lightbox/plugins/captions';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

export type { Slide } from 'yet-another-react-lightbox';

export default function Lightbox(props: LightboxExternalProps) {
  const { slides = [] } = props;
  const hasVideo = slides.some(s => s.type === 'video');

  let plugins: Plugin[] = hasVideo
    ? [Captions, Video]
    : [Captions, Download, Fullscreen, Slideshow, Thumbnails, Zoom];

  if (slides.length <= 1) {
    plugins = plugins.filter(p => p !== Thumbnails);
  }

  const animation: Partial<AnimationSettings> = {
    swipe: 300,
  };

  const carousel: Partial<CarouselSettings> = hasVideo
    ? { finite: true }
    : {
        finite: slides.length <= 1,
        preload: 3,
      };

  const thumbnails: LightboxProps['thumbnails'] = hasVideo
    ? {}
    : {
        position: 'bottom',
        border: 2,
        gap: 4,
        width: 120,
        height: 80,
        imageFit: 'contain',
        showToggle: true,
      };

  const video: LightboxProps['video'] = hasVideo
    ? {
        controls: true,
        autoPlay: true,
      }
    : {};

  return (
    <LightboxComponent
      noScroll={{ disabled: true }}
      // controller={{ closeOnBackdropClick: true }}
      plugins={plugins}
      animation={animation}
      carousel={carousel}
      thumbnails={thumbnails}
      video={video}
      render={{
        buttonPrev: slides.length <= 1 ? () => null : undefined,
        buttonNext: slides.length <= 1 ? () => null : undefined,
      }}
      {...props}
    />
  );
}
