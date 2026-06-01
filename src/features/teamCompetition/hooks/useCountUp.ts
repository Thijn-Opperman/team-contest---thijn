"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  durationMs?: number;
  /** Delay before the count starts. */
  delayMs?: number;
}

/**
 * Animates a number from 0 up to `target` using requestAnimationFrame.
 * Respects `prefers-reduced-motion` (jumps straight to the target).
 */
export function useCountUp(target: number, options: Options = {}): number {
  const { durationMs = 1200, delayMs = 0 } = options;
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // A zero-length run makes the first frame jump straight to the target,
    // keeping all setState calls inside the rAF callback (never sync in effect).
    const effectiveDuration = reduceMotion ? 0 : durationMs;

    const start = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const t =
          effectiveDuration <= 0
            ? 1
            : Math.min(1, (now - startTime) / effectiveDuration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) {
          frame.current = requestAnimationFrame(tick);
        }
      };
      frame.current = requestAnimationFrame(tick);
    };

    timeout.current = setTimeout(start, delayMs);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [target, durationMs, delayMs]);

  return value;
}
