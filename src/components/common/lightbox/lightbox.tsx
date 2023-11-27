/*
 * Image Preview Lightbox
 *
 * @Author: VenDream
 * @Date: 2023-11-27 10:26:08
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import LightboxComponent, {
  LightboxExternalProps,
  LightboxProps,
  Plugin,
} from 'yet-another-react-lightbox';

import Captions from 'yet-another-react-lightbox/plugins/captions';
// import Counter from 'yet-another-react-lightbox/plugins/counter';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

export type { Slide } from 'yet-another-react-lightbox';

export default function Lightbox(props: LightboxExternalProps) {
  const plugins: Plugin[] = [
    Captions,
    // Counter,
    Download,
    Fullscreen,
    Slideshow,
    Thumbnails,
    Zoom,
  ];

  const thumbnails: LightboxProps['thumbnails'] = {
    position: 'bottom',
    border: 1,
    imageFit: 'contain',
  };

  return (
    <LightboxComponent plugins={plugins} {...props} thumbnails={thumbnails} />
  );
}
