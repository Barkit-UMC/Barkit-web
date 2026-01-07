import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

/**
 * [PAGE 20] 내 정보 수정 페이지
 */
export default function EditProfilePage() {
    const navigate = useNavigate();

    // TODO: API에서 사용자 정보 가져오기
    const [name, setName] = useState('홍길동');
    const [email, setEmail] = useState('hong@example.com');
    const [phone, setPhone] = useState('010-1234-5678');

    const handleSave = () => {
        // TODO: 정보 수정 API 호출
        console.log('Update profile:', { name, email, phone });
        navigate('/my');
    };

    return (
        <Layout>
            <Header title="내 정보 수정" />
            <div className="p-6">
                <div className="space-y-4">
                    <Input
                        label="이름"
                        type="text"
                        value={name}
                        onChange={setName}
                    />
                    <Input
                        label="이메일"
                        type="email"
                        value={email}
                        onChange={setEmail}
                    />
                    <Input
                        label="전화번호"
                        type="tel"
                        value={phone}
                        onChange={setPhone}
                    />
                </div>

                <div className="mt-6">
                    <Button onClick={handleSave}>저장하기</Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <button
                        onClick={() => {/* TODO: 회원탈퇴 */ }}
                        className="text-sm text-red-500 hover:text-red-700"
                    >
                        회원탈퇴
                    </button>
                </div>
            </div>
        </Layout>
    );
}
