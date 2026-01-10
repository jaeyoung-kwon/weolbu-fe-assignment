import { QueryClient } from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5분
const DEFAULT_GC_TIME = 1000 * 60 * 10; // 10분

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      gcTime: DEFAULT_GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
