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
    membershipNumber?: string;
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
     * 특정 멤버십 상세 정보 조회 (대시보드 데이터에서 추출)
     * mainMemberships → memberships 순서로 검색
     */
    getMembershipDetail: async (userMembershipBrandId: number): Promise<MainMembership | null> => {
        try {
            const response = await axiosInstance.get<ApiResponse<DashboardResult>>(
                '/api/home/dashboard'
            );
            if (!response.data.isSuccess) return null;

            const { mainMemberships, memberships } = response.data.result;

            // mainMemberships에서 먼저 찾기 (membershipNumber 포함)
            const fromMain = mainMemberships.find(
                (m) => m.userMembershipBrandId === userMembershipBrandId
            );
            if (fromMain) return fromMain;

            // memberships에서 찾기
            const fromList = memberships.find(
                (m) => m.userMembershipBrandId === userMembershipBrandId
            );
            if (fromList) {
                return {
                    ...fromList,
                    membershipNumber: fromList.membershipNumber || '',
                };
            }

            return null;
        } catch {
            return null;
        }
    },

    /**
     * 이미 등록된 브랜드 ID 목록 조회 (SearchPage 필터링용)
     */
    getRegisteredBrandIds: async (): Promise<number[]> => {
        try {
            const response = await axiosInstance.get<ApiResponse<DashboardResult>>(
                '/api/home/dashboard'
            );
            if (!response.data.isSuccess) return [];

            const { mainMemberships, memberships } = response.data.result;
            const ids = new Set<number>();
            mainMemberships.forEach((m) => ids.add(m.membershipBrandId));
            memberships.forEach((m) => ids.add(m.membershipBrandId));
            return Array.from(ids);
        } catch {
            return [];
        }
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

            // 디버깅용 로그 (추후 제거)
            console.log('[hasMemberships] Dashboard response:', JSON.stringify(response.data));

            // isSuccess=false인 경우 안전하게 홈으로 보냄 (온보딩 스킵)
            if (!response.data.isSuccess) {
                return true;
            }
            const { mainMemberships, memberships } = response.data.result;
            const result = mainMemberships.length > 0 || memberships.length > 0;
            console.log('[hasMemberships] result:', result, 'main:', mainMemberships.length, 'memberships:', memberships.length);
            return result;
        } catch (err) {
            console.error('[hasMemberships] API error:', err);
            // API 실패시 일단 홈으로 보냄 (온보딩 스킵)
            return true;
        }
    },
};

export type { MainMembership, MembershipSummary, DashboardResult };
