import axiosInstance from "./axios";

export interface UserResponse {
    name: string;
    email: string;
    phoneNumber: string;
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
     * returns 사용자 정보
     */
    getMyInfo: async (): Promise<UserResponse | null> => {
        try {
            const response = await axiosInstance.get<ApiResponse<UserResponse>>('/api/users/me');
            return response.data.result;
        } catch (err) {
            console.error('내 정보 조회 실패', err);
            return null;
        }
    }
}


