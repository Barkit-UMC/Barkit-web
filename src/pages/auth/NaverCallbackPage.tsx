/**
 * 네이버 로그인 콜백 페이지
 * 네이버 OAuth 리다이렉트 후 인가 코드를 처리하는 페이지
 * 경로: /oauth/naver/callback
 */
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardApi } from '../../api/dashboard';
import { authApi } from '../../api/auth';

const NaverCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { naverLogin, error, isLoading } = useAuth();
    const hasCalledRef = useRef(false);

    useEffect(() => {
        const handleNaverCallback = async () => {
            // 중복 호출 방지
            if (hasCalledRef.current) return;
            hasCalledRef.current = true;

            const code = searchParams.get('code');
            const state = searchParams.get('state');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                // 사용자가 로그인을 취소했거나 에러 발생
                console.error('Naver OAuth Error:', errorParam);
                navigate('/login', { replace: true });
                return;
            }

            if (!code || !state) {
                console.error('No authorization code or state found');
                navigate('/login', { replace: true });
                return;
            }

            // --- [MODE: CONNECT] 계정 연동 ---
            const authMode = localStorage.getItem('auth_mode');

            if (authMode === 'connect') {
                localStorage.removeItem('auth_mode');

                try {
                    const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
                    const response = await authApi.connectNaver(code, state, redirectUri);

                    if (response.isSuccess) {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_naver' }
                        });
                    } else {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_already', provider: 'naver', errorMessage: response.message }
                        });
                    }
                } catch (err: any) {
                    console.error('Naver connect error:', err);
                    if (err.response && err.response.status === 409) {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_already', provider: 'naver', errorMessage: err.response.data?.message }
                        });
                    } else {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_fail' }
                        });
                    }
                }
                return;
            }

            try {
                const result = await naverLogin(code, state);

                if (result) {
                    // 멤버십 보유 여부 확인 → 온보딩 or 홈
                    const hasMembership = await dashboardApi.hasMemberships();
                    navigate(hasMembership ? '/home' : '/onboarding/intro', { replace: true });
                } else {
                    console.error('Naver login failed');
                    navigate('/login', { replace: true });
                }
            } catch (err) {
                console.error('Naver login error:', err);
                navigate('/login', { replace: true });
            }
        };

        handleNaverCallback();
    }, [searchParams, naverLogin, navigate]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: '16px',
                backgroundColor: '#f5f5f5',
            }}
        >
            {isLoading && (
                <>
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #03C75A',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <p style={{ color: '#666', fontSize: '16px' }}>네이버 로그인 중...</p>
                </>
            )}
            {error && (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#e74c3c', marginBottom: '8px' }}>{error}</p>
                    <p style={{ color: '#666', fontSize: '14px' }}>
                        잠시 후 로그인 페이지로 이동합니다...
                    </p>
                </div>
            )}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default NaverCallbackPage;
