/**
 * 카카오 로그인 콜백 페이지
 * 카카오 OAuth 리다이렉트 후 인가 코드를 처리하는 페이지
 * 경로: /oauth/kakao/callback
 */
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardApi } from '../../api/dashboard';

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
            const errorParam = searchParams.get('error');

            console.log('[Kakao Callback] code:', code, 'error:', errorParam);

            if (errorParam) {
                // 사용자가 로그인을 취소했거나 에러 발생
                console.error('Kakao OAuth Error:', errorParam);
                alert(`카카오 로그인 에러: ${errorParam}`);
                navigate('/login', { replace: true });
                return;
            }

            if (!code) {
                console.error('No authorization code found');
                alert('카카오 인가 코드가 없습니다.');
                navigate('/login', { replace: true });
                return;
            }

            try {
                console.log('[Kakao Callback] Calling kakaoLogin with code...');
                const result = await kakaoLogin(code);
                console.log('[Kakao Callback] Result:', result);

                if (result) {
                    // 멤버십 보유 여부 확인 → 온보딩 or 홈
                    const hasMembership = await dashboardApi.hasMemberships();
                    navigate(hasMembership ? '/home' : '/onboarding/intro', { replace: true });
                } else {
                    // 로그인 실패 - 로그인 페이지로 이동
                    console.error('[Kakao Callback] Login returned null');
                    alert('카카오 로그인 실패: 서버 응답이 없습니다.');
                    navigate('/login', { replace: true });
                }
            } catch (err) {
                console.error('Kakao login error:', err);
                alert(`카카오 로그인 에러: ${err}`);
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
