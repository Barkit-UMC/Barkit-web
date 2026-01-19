import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kakaoIcon from '../../assets/icons/sns/kakaotalk.svg';
import naverIcon from '../../assets/icons/sns/naver.svg';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

            {/* 1. 로고 영역 - mb-20 (80px) */}
            <div className="mb-25 w-full flex justify-center">
                <img
                    src="/BarKit-logo.svg"
                    alt="BarKit"
                    style={{ width: '220px', objectFit: 'contain' }}
                />
            </div>

            {/* 2. 입력 폼 영역 - gap-4 (16px) */}
            <div className="w-full max-w-[400px] flex flex-col gap-4">

                {/* 아이디 입력창 */}
                <input
                    type="email"
                    placeholder="아이디 ( 이메일 주소 )"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-gray-100 rounded-xl indent-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
                />

                {/* 비밀번호 입력창 */}
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-gray-100 rounded-xl indent-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
                />

                {/* 로그인 버튼 */}
                <button
                    onClick={() => navigate('/wallet')}
                    className="w-full h-14 mt-4 bg-[#00BCD4] text-white rounded-xl font-bold text-lg hover:bg-[#00ACC1] transition-colors shadow-sm"
                >
                    로그인
                </button>

                {/* 자동로그인 / 회원가입 - mt-2 (8px) */}
                <div className="flex items-center justify-center gap-32 px-1 ">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 accent-[#00BCD4]"
                        />
                        <span className="text-sm text-gray-500">자동 로그인</span>
                    </label>
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-sm text-gray-500 hover:text-gray-800 font-medium"
                    >
                        회원가입
                    </button>
                </div>
            </div>

            {/* 4. 소셜 로그인 - mt-6 (24px) */}
            <div className="w-full max-w-[400px] mt-6">
                {/* Divider - mb-6 (24px) */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                    <span className="text-md text-gray-400"> 간편로그인 </span>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>

                {/* 소셜 로그인 버튼 - gap-6 */}
                <div className="flex justify-center gap-6">
                    {/* 카카오 버튼 */}
                    <button onClick={() => console.log('Kakao')} className="w-15 h-15 rounded-full overflow-hidden shadow-sm hover:opacity-90 transition-opacity">
                        <img src={kakaoIcon} alt="Kakao" className="w-full h-full object-cover" />
                    </button>

                    {/* 네이버 버튼 */}
                    <button onClick={() => console.log('Naver')} className="w-15 h-15 rounded-full overflow-hidden shadow-sm hover:opacity-90 transition-opacity">
                        <img src={naverIcon} alt="Naver" className="w-full h-full object-cover" />
                    </button>
                </div>
            </div>
        </div>
    );
}