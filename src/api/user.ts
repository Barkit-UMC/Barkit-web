import axiosInstance from "./axios";

export interface UserResponse {
    name: string;
    email: string;
    birthDate: string;
}

interface ApiResponse<T> {
    isSuccess: boolean;
    code?: string;
    message?: string;
    result: T;
}

export const userApi = {
    /**
     * 내 정보 조회
     * 실패 시 예외를 던져 호출자가 catch로 처리 가능
     */
    getMyInfo: async (): Promise<UserResponse> => {
        const response = await axiosInstance.get<ApiResponse<UserResponse>>('/api/users/me');

        if (!response.data.isSuccess) {
            throw new Error(response.data.message || '사용자 정보 조회 실패');
        }

        return response.data.result;
    },
    updateBirthDate: async (birthDate: string): Promise<UserResponse> => {
        const response = await axiosInstance.put<ApiResponse<UserResponse>>(
            '/api/users/me/birth-date',
            { birthDate }
        );
        if (!response.data.isSuccess) {
            throw new Error(response.data.message || '생일 업데이트 실패');
        }
        return response.data.result;
    },
};
