/**
 * Auth Store (Zustand)
 * 인증 상태 관리 스토어
 */
import { create } from 'zustand';

interface User {
    userId: number;
    email?: string;
    name?: string;
}

interface AuthState {
    // State
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setTokens: (accessToken: string, refreshToken: string, userId: number) => void;
    clearAuth: () => void;
    checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,

    /**
     * 사용자 정보 설정
     */
    setUser: (user) => {
        set({
            user,
            isAuthenticated: !!user,
        });
    },

    /**
     * 토큰 및 사용자 ID 저장
     */
    setTokens: (accessToken, refreshToken, userId) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', String(userId));

        set({
            user: { userId },
            isAuthenticated: true,
        });
    },

    /**
     * 인증 정보 초기화 (로그아웃)
     */
    clearAuth: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');

        set({
            user: null,
            isAuthenticated: false,
        });
    },

    /**
     * 현재 인증 상태 확인
     */
    checkAuth: () => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        if (accessToken && userId) {
            set({
                user: { userId: Number(userId) },
                isAuthenticated: true,
            });
            return true;
        }

        set({
            user: null,
            isAuthenticated: false,
        });
        return false;
    },
}));
