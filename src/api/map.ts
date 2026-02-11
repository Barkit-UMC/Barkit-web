/**
 * 지도/매장 데이터 API
 */
import axiosInstance from './axios';

interface Store {
    id: number;
    name: string;
    brandId: number;
    brandName: string;
    address: string;
    lat: number;
    lng: number;
    phone?: string;
    openingHours?: string;
}

interface SearchStoresRequest {
    lat?: number;
    lng?: number;
    radius?: number; // meters
    query?: string;
    brandId?: number;
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
    searchStores: async (params: SearchStoresRequest): Promise<Store[]> => {
        const response = await axiosInstance.get<ApiResponse<Store[]>>('/api/stores', {
            params: {
                lat: params.lat,
                lng: params.lng,
                radius: params.radius,
                q: params.query,
                brandId: params.brandId,
            },
        });
        return response.data.result;
    },

    /**
     * 매장 상세 정보
     */
    getStoreById: async (id: number): Promise<Store> => {
        const response = await axiosInstance.get<ApiResponse<Store>>(`/api/stores/${id}`);
        return response.data.result;
    },

    /**
     * 즐겨찾기 매장 목록
     */
    getFavoriteStores: async (): Promise<Store[]> => {
        const response = await axiosInstance.get<ApiResponse<Store[]>>('/api/stores/favorites');
        return response.data.result;
    },

    /**
     * 즐겨찾기 추가
     */
    addFavorite: async (storeId: number): Promise<void> => {
        await axiosInstance.post(`/api/stores/${storeId}/favorite`);
    },

    /**
     * 즐겨찾기 제거
     */
    removeFavorite: async (storeId: number): Promise<void> => {
        await axiosInstance.delete(`/api/stores/${storeId}/favorite`);
    },
};

export type { Store, SearchStoresRequest };
