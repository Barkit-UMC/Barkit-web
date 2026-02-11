/**
 * 멤버십 조회/등록 API
 */
import axiosInstance from './axios';
import type { Membership } from '../types/membership';

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

interface ApiResponse<T> {
    isSuccess: boolean;
    code?: string;
    message?: string;
    result: T;
}

export const membershipApi = {
    /**
     * 사용자 보유 멤버십 브랜드 검색
     */
    getMyMemberships: async (): Promise<Membership[]> => {
        const response = await axiosInstance.get<ApiResponse<Membership[]>>('/api/memberships');
        return response.data.result;
    },

    /**
     * 멤버십 상세 조회
     */
    getMembershipById: async (id: number): Promise<Membership> => {
        const response = await axiosInstance.get<ApiResponse<Membership>>(`/api/memberships/${id}`);
        return response.data.result;
    },

    /**
     * 멤버십 등록
     */
    registerMembership: async (data: RegisterMembershipRequest): Promise<Membership> => {
        const response = await axiosInstance.post<ApiResponse<Membership>>('/api/memberships', data);
        return response.data.result;
    },

    /**
     * 멤버십 삭제
     */
    deleteMembership: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/api/memberships/${id}`);
    },

    /**
     * 브랜드 목록 조회
     */
    getBrands: async (query?: string): Promise<Brand[]> => {
        const response = await axiosInstance.get<ApiResponse<Brand[]>>('/api/brands', {
            params: query ? { q: query } : undefined,
        });
        return response.data.result;
    },

    /**
     * 인기 브랜드 조회
     */
    getPopularBrands: async (): Promise<Brand[]> => {
        const response = await axiosInstance.get<ApiResponse<Brand[]>>('/api/brands/popular');
        return response.data.result;
    },
};

export type { RegisterMembershipRequest, Brand };
