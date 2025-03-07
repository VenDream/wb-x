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
  id: string;
  image: string;
  name?: string;
}

interface IProps {
  items: Item[];
  slideItems?: Item[];

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
    slideItems,

    gap = 10,
    cols = 1,
    aspectRatio,

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
    'h-8 w-8 rounded-full border-base-content/20 p-0 shadow-xs',
    'disabled:border-base-300 disabled:bg-base-300'
  );

  const slides = useMemo<Slide[]>(() => {
    return (slideItems || items).map((item, idx) => {
      const src = item.image;
      const download = item.image;
      const filename = item.name;

      return {
        type: 'image',
        src: FAKE_IMG(item.id) || src,
        title: filename ? (
          <p className="h-[2rem] text-sm leading-[2rem] font-normal">
            {idx + 1} / {items.length} - {filename}
          </p>
        ) : undefined,
        download,
      };
    });
  }, [items, slideItems]);

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
      <div
        ref={items.length > 1 ? emblaRef : null}
        className={cn('overflow-hidden', className)}
      >
        <div
          style={{ marginLeft: -gap }}
          className="flex h-full w-full will-change-transform"
        >
          {items.map((item, idx) => {
            return (
              <div
                key={item.image}
                style={itemStyle}
                className="min-w-0 shrink-0 grow-0"
                onClick={() => previewSlides(idx)}
              >
                <div
                  className={cn(
                    'relative h-full w-full rounded-sm border shadow-xs',
                    'border-base-content/10',
                    {
                      'cursor-pointer': items.length === 1,
                    }
                  )}
                >
                  <Image
                    alt="IMG"
                    className="rounded-[inherit]"
                    src={FAKE_IMG(item.id) || item.image}
                  />
                  {item.name && (
                    <p
                      title={item.name}
                      onClick={e => e.stopPropagation()}
                      className={cn(
                        'absolute bottom-0 left-0 w-full bg-black/60 px-2 py-0.5',
                        'rounded-[inherit] rounded-t-none text-xs text-white/80',
                        'line-clamp-1 leading-5 break-all'
                      )}
                    >
                      {item.name}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {(buttons || counter) && (
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
            <span className="text-base-content select-none">
              {currSnap} / {totalSnaps}
            </span>
          )}
        </div>
      )}
      {lightbox && renderLightbox({ slides, index: currSlide })}
    </div>
  );
}
