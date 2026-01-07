import apiClient from './client';
import type { Membership } from '../types/membership';

/**
 * 멤버십 조회/등록 API
 */

interface RegisterMembershipRequest {
    brandId: number;
    barcodeNumber: string;
    barcodeFormat?: string;
}

interface Brand {
    id: number;
    name: string;
    category: string;
    logo?: string;
}

export const membershipApi = {
    /**
     * 내 멤버십 목록 조회
     */
    getMyMemberships: async (): Promise<Membership[]> => {
        return await apiClient<Membership[]>('/memberships');
    },

    /**
     * 멤버십 상세 조회
     */
    getMembershipById: async (id: number): Promise<Membership> => {
        return await apiClient<Membership>(`/memberships/${id}`);
    },

    /**
     * 멤버십 등록
     */
    registerMembership: async (data: RegisterMembershipRequest): Promise<Membership> => {
        return await apiClient<Membership>('/memberships', {
            method: 'POST',
            body: data,
        });
    },

    /**
     * 멤버십 삭제
     */
    deleteMembership: async (id: number): Promise<void> => {
        await apiClient(`/memberships/${id}`, {
            method: 'DELETE',
        });
    },

    /**
     * 브랜드 목록 조회
     */
    getBrands: async (query?: string): Promise<Brand[]> => {
        const endpoint = query ? `/brands?q=${encodeURIComponent(query)}` : '/brands';
        return await apiClient<Brand[]>(endpoint);
    },

    /**
     * 인기 브랜드 조회
     */
    getPopularBrands: async (): Promise<Brand[]> => {
        return await apiClient<Brand[]>('/brands/popular');
    },
};
