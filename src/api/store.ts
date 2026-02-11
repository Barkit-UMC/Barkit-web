
import type { Store } from '../types/store';
import { axiosInstance } from './axios';

export interface GetStoreListResponse {
  stores: Store[];
  hasNext: boolean;
  nextCursor: number | null;
}

export const getStoreList = async (
  userMembershipBrandId: number,
  cursor?: number
): Promise<GetStoreListResponse> => {
  const res = await axiosInstance.get(`/api/user-membership-brands/${userMembershipBrandId}/stores`, {
    params: { cursor },
  });

  // API 응답 구조에 맞춰 변환
  const data = res.data.result;
  const stores: Store[] = data.stores.map((s: any) => ({
    storeId: s.storeId,
    brandName: s.brandName,
    storeImageUrl: s.logoUrl, // logoUrl -> storeImageUrl
  }));

  return {
    stores,
    hasNext: data.hasNext,
    nextCursor: data.nextCursor,
  };
};
