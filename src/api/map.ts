import apiClient from './axios';

/**
 * 지도/매장 데이터 API
 */

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
    id: string;
  }[];
  userMembership: {
    name: string;
    logoUrl: string;
    userMembershipId: string;
    membershipBrandId: string;
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

export interface SearchStoresResponse {
  content: StoreSummary[];
  hasNext: boolean;
  nextCursor: number;
}

export interface StoreSummary {
    storeId: number;
    googleId: string;
    name: {
        text: string;
    };
    location: {
        lat: number;
        lng: number;
    };
    address: string;
    phone: string;
    memberships: {
        id: number;
        name: string;
        logoUrl: string;
    }[];
    distanceKm: number;
    directionUrl: string;
}

export interface MapMembershipResponse {
    userMembershipBrandId: number;
    membershipBrandName: string;
    themeColor: string;
    logoUrl: string;
    membershipNumber: string;
    storeBrands: {
        storeBrandId: number;
        name: string;
        logoUrl: string;
    }[];
}

export const mapApi = {
    // 가게 멤버십 상세 조회
    getMembershipDetail: async (userMembershipBrandId: string): Promise<CommonResponse<MapMembershipResponse>> => {
        const response = await apiClient.get<CommonResponse<MapMembershipResponse>>(
            `/api/user-membership-brands/${userMembershipBrandId}/detail`
        );
        return response.data;
    },

    /**
     * 주변 매장 검색
     */
    searchStores: async (
        req: SearchStoresRequest, 
        cursor: number = 0,
        distanceType: 'CURRENT' | 'CENTER' = 'CURRENT',
        category: string,
        sort: 'DISTANCE' | 'POPULAR' = 'DISTANCE',
        size: number = 20
    ): Promise<CommonResponse<SearchStoresResponse>> => {
        const queryParams = new URLSearchParams({
            ...(req.query && { query: req.query }), // 'req.' 제거
            ...(req.userlat && { userLat: req.userlat.toString() }),
            ...(req.userlng && { userLng: req.userlng.toString() }),
            ...(req.centerlat && { centerLat: req.centerlat.toString() }),
            ...(req.centerlng && { centerLng: req.centerlng.toString() }),
            distanceType,
            category,
            sort,
            cursor: cursor.toString(),
            size: size.toString(),
        });

        const response = await apiClient.get<CommonResponse<SearchStoresResponse>>(`/api/map/search?${queryParams.toString()}`);
        return response.data;    
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
        const response = await apiClient.get<CommonResponse<StoreDetail>>(`/api/map/store?${queryParams.toString()}`);
        console.log("API 전체 응답:", response);
        return response.data;    
    },
};
