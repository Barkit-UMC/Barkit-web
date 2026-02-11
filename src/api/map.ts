import apiClient from './client';

/**
 * 지도/매장 데이터 API
 */

export interface CommonResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

// 매장 상세 dto
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
    lat?: number;
    lng?: number;
    radius?: number; // meters
    query?: string;
    brandId?: number;
}

export const mapApi = {
    /**
     * 주변 매장 검색
     */
    searchStores: async (params: SearchStoresRequest): Promise<StoreDetail[]> => {
        const queryParams = new URLSearchParams();

        if (params.lat) queryParams.append('lat', params.lat.toString());
        if (params.lng) queryParams.append('lng', params.lng.toString());
        if (params.radius) queryParams.append('radius', params.radius.toString());
        if (params.query) queryParams.append('q', params.query);
        if (params.brandId) queryParams.append('brandId', params.brandId.toString());

        const endpoint = `/stores?${queryParams.toString()}`;
        return await apiClient<StoreDetail[]>(endpoint);
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
