import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  enabled?: boolean;
  onReachEnd: () => unknown | Promise<unknown>;
  threshold?: number | number[];
}

export const useInfiniteScroll = ({
  enabled = true,
  onReachEnd,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const latestOnReachEndRef = useRef(onReachEnd);
  const isLockedRef = useRef(false);

  useEffect(() => {
    latestOnReachEndRef.current = onReachEnd;
  }, [onReachEnd]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    if (!enabled) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (!entry.isIntersecting) return;
        if (!enabled) return;
        if (isLockedRef.current) return;

        isLockedRef.current = true;
        try {
          await latestOnReachEndRef.current();
        } finally {
          isLockedRef.current = false;
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold]);

  return { observerRef };
};
