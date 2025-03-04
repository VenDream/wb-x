/*
 * Carousel
 *
 * @Author: VenDream
 * @Date: 2024-07-23 17:25:25
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { type Slide, useLightbox } from '@/components/common/lightbox';
import { Button } from '@/components/daisyui';
import { FAKE_IMG } from '@/constants/debug';
import { cn } from '@/utils/classnames';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

interface Item {
  name?: string;
  image: string;
}

interface IProps {
  items: Item[];

  gap?: number;
  cols?: number;
  aspectRatio?: number;

  buttons?: boolean;
  counter?: boolean;
  lightbox?: boolean;

  className?: string;
  emblaOptions?: EmblaOptionsType;
}

export default function Carousel(props: IProps) {
  const {
    items,

    gap = 10,
    cols = 1,
    aspectRatio = 1,

    buttons = true,
    counter = true,
    lightbox,

    className,
    emblaOptions,
  } = props;

  const [currSlide, setCurrSlide] = useState(0);
  const [currSnap, setCurrSnap] = useState(0);
  const [totalSnaps, setTotalSnaps] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const numLength = String(items.length).length;

  const { openLightbox, renderLightbox } = useLightbox();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    dragFree: false,
    skipSnaps: true,
    ...emblaOptions,
  });

  const itemStyle: React.CSSProperties = {
    aspectRatio,
    paddingLeft: gap,
    flexBasis: `${(1 / cols) * 100}%`,
  };

  const btnClass = cn(
    'h-8 w-8 rounded-full border-base-content/20 p-0 shadow-sm',
    'disabled:border-base-300 disabled:bg-base-300'
  );

  const getDefaultName = useCallback(
    (idx: number) => String(idx + 1).padStart(numLength, '0'),
    [numLength]
  );

  const slides = useMemo<Slide[]>(() => {
    return items.map((item, idx) => {
      const src = item.image;
      const download = item.image;
      const filename = item.name || getDefaultName(idx);

      return {
        type: 'image',
        src: FAKE_IMG(idx) || src,
        title: (
          <p className="h-[2rem] text-sm font-normal leading-[2rem]">
            {idx + 1} / {items.length} - {filename}
          </p>
        ),
        download,
      };
    });
  }, [getDefaultName, items]);

  const previewSlides = (idx: number) => {
    setCurrSlide(idx);
    openLightbox();
  };

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setTotalSnaps(emblaApi.scrollSnapList().length);
    setCurrSnap(emblaApi.selectedScrollSnap() + 1);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-4">
      <div ref={emblaRef} className={cn('overflow-hidden', className)}>
        <div
          style={{ marginLeft: -gap }}
          className="flex h-full w-full will-change-transform"
        >
          {items.map((item, idx) => {
            const name = `${getDefaultName(idx)} - ${item.name || ''}`;
            return (
              <div
                key={item.image}
                style={itemStyle}
                className="min-w-0 shrink-0 grow-0"
                onClick={() => previewSlides(idx)}
              >
                <div
                  className={cn(
                    'relative h-full w-full rounded border shadow-sm',
                    'border-base-content/10'
                  )}
                >
                  <Image
                    alt="IMG"
                    src={FAKE_IMG(idx) || item.image}
                    className="rounded-[inherit]"
                  />
                  <p
                    title={name}
                    onClick={e => e.stopPropagation()}
                    className={cn(
                      'absolute bottom-0 left-0 w-full bg-black/60 px-2 py-0.5',
                      'rounded-[inherit] rounded-t-none text-xs text-white/80',
                      'line-clamp-1 break-all leading-5'
                    )}
                  >
                    {name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {buttons && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!canPrev}
              className={btnClass}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!canNext}
              className={btnClass}
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        )}
        {counter && (
          <span className="select-none text-base-content">
            {currSnap} / {totalSnaps}
          </span>
        )}
      </div>
      {lightbox && renderLightbox({ slides, index: currSlide })}
    </div>
  );
}
