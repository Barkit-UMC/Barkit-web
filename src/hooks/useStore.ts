import { useState, useCallback, useRef } from 'react';
import { getStoreList } from '../api/store';
import type { Store } from '../types/store';

export default function useStore(userMembershipBrandId: number) {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 💡 Ref를 사용하면 값이 바뀌어도 함수(fetchStores)가 새로 만들어지지 않습니다.
  const cursorRef = useRef<number | null>(null);
  const hasNextRef = useRef(true);

  // 최신화된 fetchStores: 의존성 배열에서 cursor를 제거함
  const fetchStores = useCallback(async (isReset = false, keyword?: string) => {
    // 중복 요청 방지 및 더 가져올 데이터 체크
    if (loading || (!isReset && !hasNextRef.current)) return;

    setLoading(true);
    try {
      const currentCursor = isReset ? undefined : cursorRef.current ?? undefined;
      const res = await getStoreList(userMembershipBrandId, currentCursor, keyword);

      // 데이터 업데이트
      setStores(prev => (isReset ? res.stores : [...prev, ...res.stores]));
      
      // Ref 업데이트 (이 작업은 리렌더링을 일으키지 않아 함수 주소를 고정시킵니다)
      cursorRef.current = res.nextCursor;
      hasNextRef.current = res.hasNext;
    } catch (error) {
      console.error("매장 리스트 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [userMembershipBrandId]); // 💡 loading도 뺐습니다. 내부 로직에서 직접 참조하게 됨.

  // resetAndFetch도 이제 고정된 fetchStores 덕분에 주소가 고정됩니다.
  const resetAndFetch = useCallback(async (keyword?: string) => {
    cursorRef.current = null;
    hasNextRef.current = true;
    await fetchStores(true, keyword);
  }, [fetchStores]);

  return {
    stores,
    hasNext: hasNextRef.current,
    loading,
    fetchStores,
    resetAndFetch,
  };
}