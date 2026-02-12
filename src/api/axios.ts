/**
 * Axios Instance with Interceptors
 * - Request Interceptor: 자동으로 accessToken을 헤더에 추가
 * - Response Interceptor: 401 에러 시 토큰 갱신 및 재요청 처리
 */
import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

 const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://43.200.164.91:8080').replace(/\/$/, '');
//const API_BASE_URL = '';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 완료를 기다리는 요청들의 resolver 함수들
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 완료 후 대기 중인 요청들에게 새 토큰 전달
const onRefreshComplete = (newAccessToken: string) => {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
};

// 토큰 갱신 완료를 기다리는 Promise 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

/**
 * Request Interceptor
 * - localStorage에 accessToken이 있으면 Authorization 헤더에 자동 추가
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * - 401 에러 발생 시 토큰 갱신 시도
 * - 갱신 성공: 새 토큰 저장 후 원래 요청 재전송
 * - 갱신 실패: 로그아웃 처리 및 로그인 페이지 이동
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // 401 에러이고 재시도가 아닌 경우에만 토큰 갱신 시도
        if (error.response?.status === 401 && !originalRequest._retry) {
            // 토큰 갱신 요청 자체가 실패한 경우는 바로 로그아웃
            if (originalRequest.url?.includes('/api/auth/refresh')) {
                handleLogout();
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // 이미 토큰 갱신 중이면 완료될 때까지 대기
                return new Promise((resolve) => {
                    addRefreshSubscriber((newToken: string) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                isRefreshing = false;
                handleLogout();
                return Promise.reject(error);
            }

            try {
                // 토큰 재발급 API 호출 (refreshToken은 Body에 담아서 전송)
                const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
                    refreshToken: refreshToken,
                });

                const { accessToken: newAccessToken } = response.data.result;

                // 새 토큰 저장
                localStorage.setItem('accessToken', newAccessToken);

                // 대기 중인 요청들에게 새 토큰 전달
                onRefreshComplete(newAccessToken);

                isRefreshing = false;

                // 원래 요청 재전송
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];
                handleLogout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

/**
 * 로그아웃 처리 함수
 * - 토큰 삭제 및 로그인 페이지로 이동
 */
const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    // 현재 위치가 로그인 페이지가 아닐 때만 리다이렉트
    if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
    }
};

export default axiosInstance;
