/**
 * Auth API 모듈
 * 로그인, 회원가입, 토큰 재발급, 소셜 로그인(카카오/네이버) 관련 API 함수
 */
import axiosInstance from './axios';

// === Types ===

interface TermAgreement {
    termId: number;
    isAgreed: boolean;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: TermAgreement[];
}

interface KakaoLoginRequest {
    code: string;
}

interface NaverLoginRequest {
    code: string;
    state: string;
}

interface RefreshTokenRequest {
    refreshToken: string;
}

// Response Types
interface ApiResponse<T> {
    isSuccess: boolean;
    code?: string;
    message?: string;
    result: T;
}

interface LoginResult {
    userId: number;
    accessToken: string;
    refreshToken: string;
}

interface SignupResult {
    userId: number;
    email: string;
}

interface RefreshResult {
    accessToken: string;
}

// === API Functions ===

export const authApi = {
    /**
     * 이메일 로그인
     * POST /api/auth/login
     */
    login: async (data: LoginRequest): Promise<ApiResponse<LoginResult>> => {
        const response = await axiosInstance.post<ApiResponse<LoginResult>>(
            '/api/auth/login',
            data
        );
        return response.data;
    },

    /**
     * 회원가입
     * POST /api/auth/signup
     */
    signup: async (data: SignupRequest): Promise<ApiResponse<SignupResult>> => {
        const response = await axiosInstance.post<ApiResponse<SignupResult>>(
            '/api/auth/signup',
            data
        );
        return response.data;
    },

    /**
     * 토큰 재발급
     * POST /api/auth/refresh
     * 중요: refreshToken은 Body에 담아서 전송
     */
    refresh: async (data: RefreshTokenRequest): Promise<ApiResponse<RefreshResult>> => {
        const response = await axiosInstance.post<ApiResponse<RefreshResult>>(
            '/api/auth/refresh',
            data
        );
        return response.data;
    },

    /**
     * 카카오 소셜 로그인
     * POST /api/auth/oauth/kakao/login
     * 카카오에서 받은 인가 코드(code)를 백엔드로 전달
     */
    kakaoLogin: async (code: string): Promise<ApiResponse<LoginResult>> => {
        const response = await axiosInstance.post<ApiResponse<LoginResult>>(
            '/api/auth/oauth/kakao/login',
            { code } as KakaoLoginRequest
        );
        return response.data;
    },

    /**
     * 네이버 인증 URL 가져오기
     * GET /api/auth/oauth/naver/authorize-url
     * 백엔드에서 네이버 OAuth URL을 생성하여 반환
     */
    getNaverAuthorizeUrl: async (redirectUri: string): Promise<string> => {
        const response = await axiosInstance.get<ApiResponse<string>>(
            '/api/auth/oauth/naver/authorize-url',
            { params: { redirectUri } }
        );
        return response.data.result;
    },

    /**
     * 네이버 소셜 로그인
     * POST /api/auth/oauth/naver/login
     * 네이버에서 받은 인가 코드(code)와 state를 백엔드로 전달
     */
    naverLogin: async (code: string, state: string): Promise<ApiResponse<LoginResult>> => {
        const response = await axiosInstance.post<ApiResponse<LoginResult>>(
            '/api/auth/oauth/naver/login',
            { code, state } as NaverLoginRequest
        );
        return response.data;
    },

    /**
     * 로그아웃
     * 클라이언트 측 토큰 삭제
     */
    logout: (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    },
};

// === Export Types ===
export type {
    LoginRequest,
    SignupRequest,
    KakaoLoginRequest,
    NaverLoginRequest,
    RefreshTokenRequest,
    TermAgreement,
    ApiResponse,
    LoginResult,
    SignupResult,
    RefreshResult,
};

