import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

/**
 * [PAGE 3] 회원가입 페이지
 */
export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignup = () => {
        // TODO: 회원가입 API 호출
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        console.log('Signup:', { email, password, name });
        navigate('/login');
    };

    return (
        <Layout>
            <Header title="회원가입" />
            <div className="p-6 space-y-4">
                <Input
                    label="이름"
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={setName}
                />
                <Input
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={setEmail}
                />
                <Input
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={setPassword}
                />
                <Input
                    label="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />

                <div className="pt-4">
                    <Button onClick={handleSignup}>가입하기</Button>
                </div>
            </div>
        </Layout>
    );
}
