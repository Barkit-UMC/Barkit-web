/**
 * 네이버 로그인 콜백 페이지
 * 네이버 OAuth 리다이렉트 후 인가 코드를 처리하는 페이지
 * 경로: /oauth/naver/callback
 */
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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

            console.log('[Naver Callback] code:', code, 'state:', state, 'error:', errorParam);

            if (errorParam) {
                // 사용자가 로그인을 취소했거나 에러 발생
                console.error('Naver OAuth Error:', errorParam);
                alert(`네이버 로그인 에러: ${errorParam}`);
                navigate('/login', { replace: true });
                return;
            }

            if (!code || !state) {
                console.error('No authorization code or state found');
                alert('네이버 인가 코드 또는 state가 없습니다.');
                navigate('/login', { replace: true });
                return;
            }

            try {
                console.log('[Naver Callback] Calling naverLogin with code and state...');
                const result = await naverLogin(code, state);
                console.log('[Naver Callback] Result:', result);

                if (result) {
                    // 로그인 성공 - 홈 페이지로 이동
                    navigate('/home', { replace: true });
                } else {
                    // 로그인 실패 - 로그인 페이지로 이동
                    console.error('[Naver Callback] Login returned null');
                    alert('네이버 로그인 실패: 서버 응답이 없습니다.');
                    navigate('/login', { replace: true });
                }
            } catch (err) {
                console.error('Naver login error:', err);
                alert(`네이버 로그인 에러: ${err}`);
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
