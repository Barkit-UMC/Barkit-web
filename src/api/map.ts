/**
 * 지도/매장 데이터 API
 */
import axiosInstance from './axios';

export interface CommonResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

// 매장 상세 응답 dto
export interface StoreDetail {
  name: string;
  distance: number;
  location: {
    lat: number;
    lng: number;
  };
  contact: {
    address: string;
    phoneNumber: string;
    homepage: string;
  };
  hourInfo: {
    weekdayText: string[];
    isOpen: boolean;
  };
  membership: {
    name: string;
    logoUrl: string;
  }[];
  userMembership: {
    name: string;
    logoUrl: string;
  }[];
  photos: {
    url: string;
    width: number;
    height: number;
  }[];
}

// 매장 검색 dto
export interface SearchStoresRequest {
    query?: string;
    userlat?: number;
    userlng?: number;
    centerlat?: number;
    centerlng?: number;
}

interface ApiResponse<T> {
    isSuccess: boolean;
    code?: string;
    message?: string;
    result: T;
}

export const mapApi = {
    /**
     * 주변 매장 검색
     */

    searchStores: async (
        req: SearchStoresRequest, 
        cursor: number = 0,
        distanceType: 'CURRENT' | 'CENTER' = 'CURRENT',
        category: string = 'ALL',
        sort: 'DISTANCE' | 'POPULAR' = 'DISTANCE',
        size: number = 20
    ): Promise<CommonResponse<any>> => {
        const queryParams = new URLSearchParams({
            // req 객체의 필드들을 쿼리 파라미터로 변환
            ...(req.query && { 'req.query': req.query }),
            ...(req.userlat && { 'req.userLat': req.userlat.toString() }),
            ...(req.userlng && { 'req.userLng': req.userlng.toString() }),
            ...(req.centerlat && { 'req.centerLat': req.centerlat.toString() }),
            ...(req.centerlng && { 'req.centerLng': req.centerlng.toString() }),
            distanceType,
            category,
            sort,
            cursor: cursor.toString(),
            size: size.toString(),
        });

        return await apiClient<CommonResponse<any>>(`/api/map/search?${queryParams.toString()}`);
    },

    /**
     * 매장 상세 정보
     */
    getStoreDetail: async (googleId: string, userLat: number, userLng: number): Promise<CommonResponse<StoreDetail>> => {
        const queryParams = new URLSearchParams({
            googleId,
            userLat: userLat.toString(),
            userLng: userLng.toString(),
        });

        // 명세서의 Path인 /api/map/store 사용
        return await apiClient<CommonResponse<StoreDetail>>(`/api/map/store?${queryParams.toString()}`);
    },
};

export type { Store, SearchStoresRequest };
