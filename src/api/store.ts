import type { Store } from '../types/store';
import axiosInstance from './axios';

export interface GetStoreListResponse {
  stores: Store[];
  hasNext: boolean;
  nextCursor: number | null;
}

export const getStoreList = async (
  userMembershipBrandId: number,
  cursor?: number,
  keyword?: string,
  size: number = 20
): Promise<GetStoreListResponse> => {
  const res = await axiosInstance.get(`/api/user-membership-brands/${userMembershipBrandId}/stores`, {
    params: { cursor, keyword, size },
  });

  const data = res.data.result;

  const stores: Store[] = data.stores.map((s: any) => ({
    storeId: s.storeId,
    brandName: s.brandName,
    storeImageUrl: s.logoUrl,
  }));

  return {
    stores,
    hasNext: data.hasNext,
    nextCursor: data.nextCursor,
  };
};
