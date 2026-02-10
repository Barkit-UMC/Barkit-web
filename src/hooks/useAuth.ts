/**
 * useAuth Hook
 * 인증 관련 로직을 캡슐화한 커스텀 훅
 */
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { authApi } from '../api/auth';
import type {
    LoginRequest,
    SignupRequest,
    LoginResult,
    SignupResult,
} from '../api/auth';

interface UseAuthReturn {
    // State
    isAuthenticated: boolean;
    user: { userId: number } | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (data: LoginRequest) => Promise<LoginResult | null>;
    signup: (data: SignupRequest) => Promise<SignupResult | null>;
    kakaoLogin: (code: string) => Promise<LoginResult | null>;
    naverLogin: (code: string, state: string) => Promise<LoginResult | null>;
    startKakaoLogin: () => void;
    startNaverLogin: () => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
    const navigate = useNavigate();
    const { user, isAuthenticated, setTokens, clearAuth, setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 이메일 로그인
     */
    const login = useCallback(
        async (data: LoginRequest): Promise<LoginResult | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await authApi.login(data);

                if (response.isSuccess && response.result) {
                    const { accessToken, refreshToken, userId } = response.result;
                    setTokens(accessToken, refreshToken, userId);
                    return response.result;
                } else {
                    setError(response.message || '로그인에 실패했습니다.');
                    return null;
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.';
                setError(errorMessage);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [setTokens]
    );

    /**
     * 회원가입
     */
    const signup = useCallback(
        async (data: SignupRequest): Promise<SignupResult | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await authApi.signup(data);

                if (response.isSuccess && response.result) {
                    return response.result;
                } else {
                    setError(response.message || '회원가입에 실패했습니다.');
                    return null;
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.';
                setError(errorMessage);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    /**
     * 카카오 소셜 로그인 시작
     * 카카오 OAuth 인증 페이지로 리다이렉트
     */
    const startKakaoLogin = useCallback(() => {
        const kakaoClientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
        const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectUri}`;

        window.location.href = kakaoAuthUrl;
    }, []);

    /**
     * 카카오 소셜 로그인 처리
     * 카카오 리다이렉트 콜백에서 받은 인가 코드(code)를 사용
     */
    const kakaoLogin = useCallback(
        async (code: string): Promise<LoginResult | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
                const response = await authApi.kakaoLogin(code, redirectUri);

                if (response.isSuccess && response.result) {
                    const { accessToken, refreshToken, userId } = response.result;
                    setTokens(accessToken, refreshToken, userId);
                    return response.result;
                } else {
                    setError(response.message || '카카오 로그인에 실패했습니다.');
                    return null;
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : '카카오 로그인 중 오류가 발생했습니다.';
                setError(errorMessage);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [setTokens]
    );

    /**
     * 네이버 소셜 로그인 시작
     * 백엔드에서 네이버 OAuth URL(state 포함)을 받아와 리다이렉트
     */
    const startNaverLogin = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
            const naverAuthUrl = await authApi.getNaverAuthorizeUrl(redirectUri);

            window.location.href = naverAuthUrl;
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : '네이버 로그인 URL을 가져오는 중 오류가 발생했습니다.';
            setError(errorMessage);
            setIsLoading(false);
        }
    }, []);

    /**
     * 네이버 소셜 로그인 처리
     * 네이버 리다이렉트 콜백에서 받은 인가 코드(code)와 state를 사용
     */
    const naverLogin = useCallback(
        async (code: string, state: string): Promise<LoginResult | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
                const response = await authApi.naverLogin(code, state, redirectUri);

                if (response.isSuccess && response.result) {
                    const { accessToken, refreshToken, userId } = response.result;
                    setTokens(accessToken, refreshToken, userId);
                    return response.result;
                } else {
                    setError(response.message || '네이버 로그인에 실패했습니다.');
                    return null;
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : '네이버 로그인 중 오류가 발생했습니다.';
                setError(errorMessage);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [setTokens]
    );

    /**
     * 로그아웃
     */
    const logout = useCallback(() => {
        authApi.logout();
        clearAuth();
        setUser(null);
        navigate('/login');
    }, [clearAuth, setUser, navigate]);

    /**
     * 에러 초기화
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        login,
        signup,
        kakaoLogin,
        naverLogin,
        startKakaoLogin,
        startNaverLogin,
        logout,
        clearError,
    };
};
