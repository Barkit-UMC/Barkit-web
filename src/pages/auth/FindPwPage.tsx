import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

/**
 * [PAGE 2] 비밀번호 찾기 페이지
 */
export default function FindPwPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSendEmail = () => {
        // TODO: 비밀번호 재설정 이메일 발송 API 호출
        console.log('Send reset email to:', email);
        setSent(true);
    };

    return (
        <Layout>
            <Header title="비밀번호 찾기" />
            <div className="p-6">
                {!sent ? (
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-6">
                            가입하신 이메일 주소를 입력하시면<br />
                            비밀번호 재설정 링크를 보내드립니다.
                        </p>
                        <Input
                            type="email"
                            placeholder="이메일 주소"
                            value={email}
                            onChange={setEmail}
                        />
                        <Button onClick={handleSendEmail}>재설정 링크 보내기</Button>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">✉️</div>
                        <h2 className="text-xl font-semibold mb-2">이메일을 확인하세요</h2>
                        <p className="text-gray-600 mb-6">
                            {email}로<br />
                            비밀번호 재설정 링크를 보냈습니다.
                        </p>
                        <Button onClick={() => navigate('/login')}>로그인으로 돌아가기</Button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
