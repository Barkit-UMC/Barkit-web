import apiClient from './client';

/**
 * 지도/매장 데이터 API
 */

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

export const mapApi = {
    /**
     * 주변 매장 검색
     */
    searchStores: async (params: SearchStoresRequest): Promise<Store[]> => {
        const queryParams = new URLSearchParams();

        if (params.lat) queryParams.append('lat', params.lat.toString());
        if (params.lng) queryParams.append('lng', params.lng.toString());
        if (params.radius) queryParams.append('radius', params.radius.toString());
        if (params.query) queryParams.append('q', params.query);
        if (params.brandId) queryParams.append('brandId', params.brandId.toString());

        const endpoint = `/stores?${queryParams.toString()}`;
        return await apiClient<Store[]>(endpoint);
    },

    /**
     * 매장 상세 정보
     */
    getStoreById: async (id: number): Promise<Store> => {
        return await apiClient<Store>(`/stores/${id}`);
    },

    /**
     * 즐겨찾기 매장 목록
     */
    getFavoriteStores: async (): Promise<Store[]> => {
        return await apiClient<Store[]>('/stores/favorites');
    },

    /**
     * 즐겨찾기 추가
     */
    addFavorite: async (storeId: number): Promise<void> => {
        await apiClient(`/stores/${storeId}/favorite`, {
            method: 'POST',
        });
    },

    /**
     * 즐겨찾기 제거
     */
    removeFavorite: async (storeId: number): Promise<void> => {
        await apiClient(`/stores/${storeId}/favorite`, {
            method: 'DELETE',
        });
    },
};
