import { useInfiniteQuery } from '@tanstack/react-query';
import { getStoreList } from '../api/store';

export default function useInfiniteStore(
  brandId: number,
  keyword: string
) {
  return useInfiniteQuery({
    queryKey: ['stores', brandId, keyword],
    queryFn: ({ pageParam }) =>
      getStoreList(brandId, pageParam ?? undefined, keyword),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!brandId,
  });
}