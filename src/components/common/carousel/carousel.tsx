/*
 * Carousel
 *
 * @Author: VenDream
 * @Date: 2024-07-23 17:25:25
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import Image from '@/components/common/image';
import { Button } from '@/components/daisyui';
import { FAKE_IMG } from '@/contants/debug';
import { cn } from '@/utils/classnames';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

interface Slide {
  name?: string;
  image: string;
}

interface IProps {
  slides: Slide[];

  gap?: number;
  cols?: number;
  aspectRatio?: number;

  buttons?: boolean;
  counter?: boolean;
  lightbox?: boolean;

  className?: string;
  emblaOptions?: EmblaOptionsType;
}

const photo = 'https://picsum.photos/200/356';

export default function Carousel(props: IProps) {
  const {
    slides,

    gap = 10,
    cols = 1,
    aspectRatio = 1,

    buttons = true,
    counter = true,
    lightbox,

    className,
    emblaOptions,
  } = props;

  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const numLength = String(slides.length).length;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    dragFree: false,
    skipSnaps: true,
    ...emblaOptions,
  });

  const sliceStyle: React.CSSProperties = {
    aspectRatio,
    paddingLeft: gap,
    flexBasis: `calc(${(1 / cols) * 100}% + 0px)`,
  };

  const btnClass = cn(
    'h-8 w-8 rounded-full border-base-content/20 p-0 shadow-sm',
    'disabled:border-base-300 disabled:bg-base-300'
  );

  const getDefaultName = (idx: number) =>
    String(idx + 1).padStart(numLength, '0');

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setTotal(emblaApi.scrollSnapList().length);
    setCurrent(emblaApi.selectedScrollSnap() + 1);
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
          {slides.map((slide, idx) => {
            const name = slide.name || getDefaultName(idx);
            return (
              <div
                key={slide.image}
                style={sliceStyle}
                className="min-w-0 shrink-0 grow-0"
              >
                <div
                  className={cn(
                    'relative h-full w-full rounded border shadow-sm',
                    'border-base-content/10'
                  )}
                >
                  <Image
                    alt="IMG"
                    fill
                    src={
                      photo + `?random=${idx + 1}` || FAKE_IMG || slide.image
                    }
                    className="rounded-[inherit] object-cover"
                  />
                  <p
                    title={name}
                    className={cn(
                      'absolute bottom-0 left-0 w-full bg-black/60 px-2 py-1',
                      'rounded-[inherit] rounded-t-none text-xs text-white/80',
                      'line-clamp-1'
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
          <span className="text-base-content">
            {current} / {total}
          </span>
        )}
      </div>
    </div>
  );
}
