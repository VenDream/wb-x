'use client';

/*
 * Animatable counter
 *
 * @Author: VenDream
 * @Date: 2023-08-24 10:41:55
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { type AnimationPlaybackControls, useAnimate } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface CounterProps {
  /** count from */
  from?: number;
  /** count to */
  to: number;
  /** duration */
  duration?: number;
  /** convert to locale string or not */
  localeString?: boolean;
}

export default function Counter(props: CounterProps) {
  const { from, to, duration = 1, localeString = true } = props;
  const [scope, animate] = useAnimate<HTMLParagraphElement>();

  const [innerFrom, setInnerFrom] = useState(from || to);
  const [innerTo, setInnerTo] = useState(props.to);

  const getFormattedValue = useCallback(
    (value: number) =>
      localeString ? value.toLocaleString() : value.toString(),
    [localeString]
  );

  const defaultValue = getFormattedValue(innerFrom);

  useEffect(() => {
    if (from !== innerFrom && from !== undefined) {
      setInnerFrom(from);
    }

    if (to !== innerTo && to !== undefined) {
      from === undefined && setInnerFrom(innerTo);
      setInnerTo(to);
    }
  }, [from, innerFrom, innerTo, to]);

  useEffect(() => {
    let controls: AnimationPlaybackControls | null = null;

    if (innerFrom === innerTo) {
      scope.current.innerText = getFormattedValue(innerTo);
    } else {
      controls = animate(innerFrom, innerTo, {
        duration,
        onUpdate(value) {
          const p = scope.current;
          const newValue = +value.toFixed(0);
          p && (p.innerText = getFormattedValue(newValue));
        },
      });
    }
    return () => {
      controls?.stop();
    };
  }, [animate, duration, getFormattedValue, innerFrom, innerTo, scope]);

  return <p ref={scope}>{defaultValue}</p>;
}
