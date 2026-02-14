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
  }[];
  userMembership: {
    name: string;
    logoUrl: string;
    userMembershipId: number;
    membershipBrandId: number;
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
  userLat?: number;
  userLng?: number;
  centerLat?: number;
  centerLng?: number;
}

export interface SearchStoresResponse {
  content: StoreSummary[];
  hasNext: boolean;
  nextCursor: number;
}

export interface StoreSummary {
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
  membershipIds: number[];
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
    distanceType: string,
    category: string,
    size: number = 20
  ): Promise<CommonResponse<SearchStoresResponse>> => {
    const response = await apiClient.get<CommonResponse<SearchStoresResponse>>(`/api/map/search`, {
      params: {
        // req 객체 안의 필드들을 펼쳐서 전달
        query: req.query,
        userLat: req.userLat,
        userLng: req.userLng,
        centerLat: req.centerLat,
        centerLng: req.centerLng,
        distanceType,
        category,
        cursor,
        size,
      },
    });
    return response.data;
  },

  /**
   * 매장 상세 정보 조회
   * POST /api/map/store
   */
  getStoreDetail: async (data: {
    userLat: number;
    userLng: number;
    googleId: string;
    membershipIds: number[];
  }): Promise<CommonResponse<StoreDetail>> => {
    const response = await apiClient.post<CommonResponse<StoreDetail>>(`/api/map/store`, data);
    return response.data;
  },
};
