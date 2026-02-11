import { useState } from 'react';
import { getStoreList } from '../api/store';
import type { Store } from '../types/store';

export default function useStore(userMembershipBrandId: number) {
  const [stores, setStores] = useState<Store[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchStores = async (isReset = false, keyword?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getStoreList(
        userMembershipBrandId,
        isReset ? undefined : cursor ?? undefined,
        keyword
      );

      setStores(prev => (isReset ? res.stores : [...prev, ...res.stores]));
      setHasNext(res.hasNext);
      setCursor(res.nextCursor);
    } finally {
      setLoading(false);
    }
  };

  const resetAndFetch = (keyword?: string) => {
    setCursor(null);
    setHasNext(true);
    fetchStores(true, keyword);
  };

  return {
    stores,
    hasNext,
    loading,
    fetchStores,
    resetAndFetch,
  };
}
