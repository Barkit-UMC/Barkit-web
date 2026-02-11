import { useInfiniteQuery } from '@tanstack/react-query';
import { getStoreList } from '../api/store';

export default function useInfiniteStore(
  brandId: number,
  keyword: string
) {
  return useInfiniteQuery({
    queryKey: ['stores', brandId, keyword],
    queryFn: ({ pageParam = 0 }) =>
      getStoreList(brandId, pageParam, keyword),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!brandId,
  });
}
