import apiClient from './client';

/**
 * 로그인 관련 API
 */

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

interface SocialLoginRequest {
    provider: 'kakao' | 'naver';
    accessToken: string;
}

export const authApi = {
    /**
     * 이메일 로그인
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient<LoginResponse>('/auth/login', {
            method: 'POST',
            body: data,
        });

        // 토큰 저장
        localStorage.setItem('authToken', response.token);

        return response;
    },

    /**
     * 회원가입
     */
    signup: async (data: SignupRequest): Promise<LoginResponse> => {
        return await apiClient<LoginResponse>('/auth/signup', {
            method: 'POST',
            body: data,
        });
    },

    /**
     * 소셜 로그인
     */
    socialLogin: async (data: SocialLoginRequest): Promise<LoginResponse> => {
        const response = await apiClient<LoginResponse>('/auth/social', {
            method: 'POST',
            body: data,
        });

        localStorage.setItem('authToken', response.token);

        return response;
    },

    /**
     * 로그아웃
     */
    logout: async (): Promise<void> => {
        localStorage.removeItem('authToken');
        await apiClient('/auth/logout', {
            method: 'POST',
        });
    },

    /**
     * 비밀번호 재설정 이메일 발송
     */
    sendPasswordResetEmail: async (email: string): Promise<void> => {
        await apiClient('/auth/password-reset', {
            method: 'POST',
            body: { email },
        });
    },
};
