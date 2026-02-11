/**
 * 홈 대시보드 API
 * GET /api/home/dashboard - 멤버십 보유 여부 확인용
 */
import axiosInstance from './axios';

interface MainMembership {
    userMembershipBrandId: number;
    membershipBrandId: number;
    name: string;
    logoUrl: string;
    membershipNumber: string;
}

interface MembershipSummary {
    userMembershipBrandId: number;
    membershipBrandId: number;
    name: string;
    logoUrl: string;
}

interface DashboardResult {
    mainMemberships: MainMembership[];
    memberships: MembershipSummary[];
}

interface ApiResponse<T> {
    isSuccess: boolean;
    code?: string;
    message?: string;
    result: T;
}

export const dashboardApi = {
    /**
     * 홈 대시보드 조회
     * 로그인 사용자의 멤버십 보유 현황 확인
     */
    getDashboard: async (): Promise<ApiResponse<DashboardResult>> => {
        const response = await axiosInstance.get<ApiResponse<DashboardResult>>(
            '/api/home/dashboard'
        );
        return response.data;
    },

    /**
     * 멤버십 보유 여부 확인 (헬퍼)
     * @returns true = 멤버십 있음, false = 멤버십 없음 (온보딩 필요)
     */
    hasMemberships: async (): Promise<boolean> => {
        try {
            const response = await axiosInstance.get<ApiResponse<DashboardResult>>(
                '/api/home/dashboard'
            );
            // isSuccess=false인 경우 안전하게 홈으로 보냄 (온보딩 스킵)
            if (!response.data.isSuccess) {
                return true;
            }
            const { mainMemberships, memberships } = response.data.result;
            return mainMemberships.length > 0 || memberships.length > 0;
        } catch {
            // API 실패시 일단 홈으로 보냄 (온보딩 스킵)
            return true;
        }
    },
};

export type { MainMembership, MembershipSummary, DashboardResult };
