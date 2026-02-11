/**
 * 카카오 로그인 콜백 페이지
 * 카카오 OAuth 리다이렉트 후 인가 코드를 처리하는 페이지
 * 경로: /oauth/kakao/callback
 */
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardApi } from '../../api/dashboard';
import { authApi } from '../../api/auth';

const KakaoCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { kakaoLogin, error, isLoading } = useAuth();
    const hasCalledRef = useRef(false);

    useEffect(() => {
        const handleKakaoCallback = async () => {
            // 중복 호출 방지
            if (hasCalledRef.current) return;
            hasCalledRef.current = true;

            const code = searchParams.get('code');
            const state = searchParams.get('state');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                // 사용자가 로그인을 취소했거나 에러 발생
                console.error('Kakao OAuth Error:', errorParam);
                navigate('/login', { replace: true });
                return;
            }

            if (!code) {
                console.error('No authorization code found');
                navigate('/login', { replace: true });
                return;
            }

            // 1. 모드 확인 (localStorage)
            const authMode = localStorage.getItem('auth_mode');

            // --- [MODE: CONNECT] 계정 연동 ---
            if (authMode === 'connect') {
                localStorage.removeItem('auth_mode');

                // 연동 모드에서도 State 검증은 권장되나, 여기서는 흐름 분리를 우선함.
                // 필요시 sessionStorage.getItem('kakao_oauth_state')와 비교 가능.

                try {
                    // .env가 복구되었으므로 로그인용 Redirect URI 사용
                    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
                    const response = await authApi.connectKakao(code, redirectUri);

                    if (response.isSuccess) {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_kakao' }
                        });
                    } else {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_already', provider: 'kakao', errorMessage: response.message }
                        });
                    }
                } catch (err: any) {
                    console.error('Kakao connect error:', err);
                    if (err.response && err.response.status === 409) {
                        navigate('/profile/edit', {
                            replace: true,
                            state: { toast: 'connect_already', provider: 'kakao', errorMessage: err.response.data?.message }
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

            // --- [MODE: LOGIN] 로그인 ---
            // State 검증 (CSRF 방지) - 로그인 시에는 필수
            const storedState = sessionStorage.getItem('kakao_oauth_state');
            if (!state || state !== storedState) {
                console.error('Invalid state parameter');
                sessionStorage.removeItem('kakao_oauth_state');
                navigate('/login', { replace: true });
                return;
            }
            sessionStorage.removeItem('kakao_oauth_state');

            // --- [MODE: LOGIN] 로그인 ---
            try {
                const result = await kakaoLogin(code);

                if (result) {
                    // 멤버십 보유 여부 확인 → 온보딩 or 홈
                    const hasMembership = await dashboardApi.hasMemberships();
                    navigate(hasMembership ? '/home' : '/onboarding/intro', { replace: true });
                } else {
                    console.error('Kakao login failed');
                    navigate('/login', { replace: true });
                }
            } catch (err) {
                console.error('Kakao login error:', err);
                navigate('/login', { replace: true });
            }
        };

        handleKakaoCallback();
    }, [searchParams, kakaoLogin, navigate]);

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
                            borderTop: '4px solid #FEE500',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <p style={{ color: '#666', fontSize: '16px' }}>카카오 로그인 중...</p>
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

export default KakaoCallbackPage;
