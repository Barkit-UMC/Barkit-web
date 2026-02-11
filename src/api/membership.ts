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

interface StoreBrand {
    storeBrandId: number;
    name: string;
    logoUrl: string;
}

export interface UserMembershipDetail {
    userMembershipBrandId: number;
    membershipBrandName: string;
    themeColor: string;
    logoUrl: string;
    membershipNumber: string;
    storeBrands: StoreBrand[];
}

export const membershipApi = {
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
     * 사용자 멤버십 상세 조회 (NEW API)
     * GET /api/user-membership-brands/{userMembershipBrandId}/detail
     */
    getUserMembershipDetail: async (
        userMembershipBrandId: number
    ): Promise<ApiResponse<UserMembershipDetail>> => {
        const response = await axiosInstance.get<ApiResponse<UserMembershipDetail>>(
            `/api/user-membership-brands/${userMembershipBrandId}/detail`
        );
        return response.data;
    },

    /**
     * 대표 멤버십 설정/해제
     * PATCH /api/user-membership-brands/{userMembershipBrandId}/main
     */
    toggleMainMembership: async (
        userMembershipBrandId: number
    ): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.patch<ApiResponse<string>>(
            `/api/user-membership-brands/${userMembershipBrandId}/main`
        );
        return response.data;
    },

    /**
     * 멤버십 등록 (NEW API)
     * POST /api/user-membership-brands/{membershipBrandId}
     */
    registerUserMembership: async (
        membershipBrandId: number,
        membershipNumber: string
    ): Promise<ApiResponse<{ userMembershipBrandId: number; membershipNumber: string }>> => {
        const response = await axiosInstance.post<
            ApiResponse<{ userMembershipBrandId: number; membershipNumber: string }>
        >(`/api/user-membership-brands/${membershipBrandId}`, { membershipNumber });
        return response.data;
    },

    /**
     * 멤버십 삭제 (NEW API)
     * DELETE /api/user-membership-brands/{userMembershipBrandId}
     */
    deleteUserMembership: async (
        userMembershipBrandId: number
    ): Promise<ApiResponse<{ userMembershipBrandId: number; membershipNumber: string }>> => {
        const response = await axiosInstance.delete<
            ApiResponse<{ userMembershipBrandId: number; membershipNumber: string }>
        >(`/api/user-membership-brands/${userMembershipBrandId}`);
        return response.data;
    },

    /**
     * 멤버십 번호 변경 (NEW API)
     * PATCH /api/user-membership-brands/{userMembershipBrandId}
     */
    updateMembershipNumber: async (
        userMembershipBrandId: number,
        membershipNumber: string
    ): Promise<ApiResponse<{ userMembershipBrandId: number; membershipNumber: string }>> => {
        const response = await axiosInstance.patch<
            ApiResponse<{ userMembershipBrandId: number; membershipNumber: string }>
        >(`/api/user-membership-brands/${userMembershipBrandId}`, { membershipNumber });
        return response.data;
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

    /**
     * 사용자 보유 멤버십 브랜드 검색
     * GET /api/user-membership-brands/search
     */
    searchUserMembershipBrands: async (
        keyword: string,
        cursor: number = 0,
        limit: number = 20
    ): Promise<{
        brands: {
            userMembershipBrandId: number;
            name: string;
            logoUrl: string;
        }[];
        nextCursor: number;
        hasNext: boolean;
    }> => {
        const response = await axiosInstance.get('/api/user-membership-brands/search', {
            params: { keyword, cursor, limit },
        });

        return response.data.result;
    },

};

export type { RegisterMembershipRequest, Brand };
