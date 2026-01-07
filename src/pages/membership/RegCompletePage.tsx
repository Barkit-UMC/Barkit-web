import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';

/**
 * [PAGE 8] 등록 완료 페이지
 */
export default function RegCompletePage() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="text-center">
                    <div className="text-6xl mb-6">✅</div>
                    <h1 className="text-2xl font-bold mb-2">등록 완료!</h1>
                    <p className="text-gray-600 mb-8">
                        멤버십이 성공적으로 등록되었습니다
                    </p>

                    <div className="space-y-3">
                        <Button onClick={() => navigate('/wallet')}>
                            내 멤버십 보기
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/membership/select')}
                        >
                            다른 멤버십 추가하기
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
