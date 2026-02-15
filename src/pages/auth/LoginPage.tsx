import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardApi } from '../../api/dashboard';
import kakaoIcon from '../../assets/icons/sns/kakaotalk.svg';
import naverIcon from '../../assets/icons/sns/naver.svg';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, startKakaoLogin, startNaverLogin, isLoading, error, clearError } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);

    // 이메일 로그인 핸들러
    const handleEmailLogin = async () => {
        if (!email || !password) {
            return;
        }

        const result = await login({ email, password });
        if (result) {
            // 멤버십 보유 여부 확인 → 온보딩 or 홈
            const hasMembership = await dashboardApi.hasMemberships();
            navigate(hasMembership ? '/home' : '/onboarding/intro', { replace: true });
        }
    };

    // Enter 키 핸들러
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEmailLogin();
        }
    };

    return (
        <div className="h-full flex flex-col items-center bg-white px-6 overflow-hidden py-8">

            {/* 1. 로고 영역 - mb-20 (80px) */}
            <div className="py-15 flex items-center w-full justify-center">
                <img
                    src="/BarKit-logo.svg"
                    alt="BarKit"
                    style={{ width: '220px', objectFit: 'contain' }}
                />
            </div>

            {/* 2. 입력 폼 영역 - gap-4 (16px) */}
            <div className="w-full max-w-[400px] flex flex-col gap-4">

                {/* 에러 메시지 */}
                {error && (
                    <div
                        className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl flex justify-between items-center"
                        onClick={clearError}
                    >
                        <span>{error}</span>
                        <button className="text-red-400 hover:text-red-600">✕</button>
                    </div>
                )}

                {/* 아이디 입력창 */}
                <input
                    type="email"
                    placeholder="아이디 ( 이메일 주소 )"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="w-full h-14 bg-gray-100 rounded-3xl indent-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] disabled:opacity-50"
                />

                {/* 비밀번호 입력창 */}
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="w-full h-14 bg-gray-100 rounded-3xl indent-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] disabled:opacity-50"
                />

                {/* 로그인 버튼 */}
                <button
                    onClick={handleEmailLogin}
                    disabled={isLoading || !email || !password}
                    className="w-full h-14 bg-[#00C0E8] text-white rounded-3xl font-semibold text-base flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        '로그인'
                    )}
                </button>

                {/* 자동로그인 / 회원가입 - mt-2 (8px) */}
                <div className="flex items-center justify-center gap-40 px-1 ">
                    <label
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setAutoLogin(!autoLogin)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 13L9 17L19 7"
                                stroke={autoLogin ? "#16D346" : "#D8D8D8"}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-sm text-gray-300 font-regular">자동 로그인</span>
                    </label>
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-sm text-gray-300 hover:text-gray-500 font-regular"
                    >
                        회원가입
                    </button>
                </div>
            </div>

            {/* 4. 소셜 로그인 - mt-6 (24px) */}
            <div className="flex-1 flex flex-col justify-center w-full max-w-[400px] mt-4">
                {/* Divider - mb-6 (24px) */}
                <div className="flex items-center gap-4 pb-4">
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                    <span className="text-md text-gray-300"> 간편로그인 </span>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>

                {/* 소셜 로그인 버튼 - gap-6 */}
                <div className="flex justify-center gap-6">
                    {/* 카카오 버튼 */}
                    <button
                        onClick={startKakaoLogin}
                        disabled={isLoading}
                        className="w-15 h-15 rounded-full overflow-hidden hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        <img src={kakaoIcon} alt="Kakao" className="w-full h-full object-cover" />
                    </button>

                    {/* 네이버 버튼 */}
                    <button
                        onClick={startNaverLogin}
                        disabled={isLoading}
                        className="w-15 h-15 rounded-full overflow-hidden hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        <img src={naverIcon} alt="Naver" className="w-full h-full object-cover" />
                    </button>
                </div>
            </div>
        </div>
    );
}