/**
 * 네이버 계정 연동 콜백 페이지
 * 네이버 OAuth 리다이렉트 후 계정 연동 처리
 * 경로: /oauth/naver/connect-callback
 */
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../../api/auth';

const NaverConnectCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const hasCalledRef = useRef(false);

    useEffect(() => {
        const handleConnect = async () => {
            if (hasCalledRef.current) return;
            hasCalledRef.current = true;

            const code = searchParams.get('code');
            const state = searchParams.get('state');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                console.error('Naver OAuth Error:', errorParam);
                navigate('/profile/edit', {
                    replace: true,
                    state: { toast: 'connect_fail' }
                });
                return;
            }

            if (!code || !state) {
                console.error('No authorization code or state found');
                navigate('/profile/edit', {
                    replace: true,
                    state: { toast: 'connect_fail' }
                });
                return;
            }

            try {
                const redirectUri = import.meta.env.VITE_NAVER_CONNECT_REDIRECT_URI;
                const response = await authApi.connectNaver(code, state, redirectUri);

                if (response.isSuccess) {
                    navigate('/profile/edit', {
                        replace: true,
                        state: { toast: 'connect_naver' }
                    });
                } else {
                    // 이미 연동된 경우 등 에러
                    navigate('/profile/edit', {
                        replace: true,
                        state: { toast: 'connect_already', provider: 'naver', errorMessage: response.message }
                    });
                }
            } catch (err) {
                console.error('Naver connect error:', err);
                navigate('/profile/edit', {
                    replace: true,
                    state: { toast: 'connect_fail' }
                });
            }
        };

        handleConnect();
    }, [searchParams, navigate]);

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
                <p style={{ color: '#666', fontSize: '16px' }}>네이버 계정 연동 중...</p>
            </>
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

export default NaverConnectCallbackPage;
