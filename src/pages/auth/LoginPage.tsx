import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import SocialLoginBtn from '../../components/auth/SocialLoginBtn';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

/**
 * [PAGE 2] 로그인 페이지
 */
export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: 로그인 API 호출
        console.log('Login:', { email, password });
        navigate('/wallet');
    };

    const handleSocialLogin = (provider: 'kakao' | 'naver') => {
        // TODO: 소셜 로그인 API 호출
        console.log('Social login:', provider);
        navigate('/wallet');
    };

    return (
        <Layout>
            <div className="flex flex-col min-h-screen p-6">
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-8 text-center">Barkit</h1>

                    <div className="space-y-4 mb-6">
                        <Input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={setEmail}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={setPassword}
                        />
                    </div>

                    <Button onClick={handleLogin}>로그인</Button>

                    <div className="flex justify-center gap-4 my-6 text-sm text-gray-600">
                        <button onClick={() => navigate('/signup')}>회원가입</button>
                        <span>|</span>
                        <button onClick={() => navigate('/find-password')}>비밀번호 찾기</button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">또는</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SocialLoginBtn provider="kakao" onClick={() => handleSocialLogin('kakao')} />
                        <SocialLoginBtn provider="naver" onClick={() => handleSocialLogin('naver')} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
