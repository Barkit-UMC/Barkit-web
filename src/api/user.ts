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

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface changeBirthResponse {
  name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
}


export const userApi = {
  /** 내 정보 조회 */
  getMyInfo: async (): Promise<UserResponse> => {
    const response = await axiosInstance.get<ApiResponse<UserResponse>>('/api/users/me');
    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '사용자 정보 조회 실패');
    }
    return response.data.result;
  },

  /** 비밀번호 변경 */
  updatePassword: async (data: UpdatePasswordRequest): Promise<string> => {
    const response = await axiosInstance.patch<ApiResponse<string>>(
      '/api/users/me/password',
      data
    );
    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '비밀번호 변경 실패');
    }
    return response.data.result;
  },

  /** 비밀번호 유효성 검사 (현재 비밀번호 확인) */
  validatePassword: async (currentPassword: string): Promise<boolean> => {
    const response = await axiosInstance.post<ApiResponse<any>>(
      '/api/users/me/validate-password',
      { currentPassword }
    );
    return response.data.isSuccess;
  },
    updateBirthDate: async (birthDate: string): Promise<changeBirthResponse> => {
        const response = await axiosInstance.patch<ApiResponse<changeBirthResponse>>(
            '/api/users/me/birth-date',
            { birthDate }
        );
        if (!response.data.isSuccess) {
            throw new Error(response.data.message || '생일 업데이트 실패');
        }

        return response.data.result;
    },
};
