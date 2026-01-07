import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import BottomNav from '../../components/common/BottomNav';
import BarcodeCard from '../../components/barcode/BarcodeCard';

/**
 * [PAGE 9] 홈 (내 바코드 리스트)
 */
export default function WalletPage() {
    const navigate = useNavigate();

    // TODO: API에서 사용자의 멤버십 목록 가져오기
    const memberships = [
        { id: 1, brandName: '스타벅스', barcodeNumber: '1234567890123' },
        { id: 2, brandName: 'GS25', barcodeNumber: '9876543210987' },
        { id: 3, brandName: '올리브영', barcodeNumber: '5555666677778' },
    ];

    return (
        <Layout showBottomNav>
            <div className="p-6 pb-20">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">내 멤버십</h1>
                    <button
                        onClick={() => navigate('/membership/select')}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {memberships.length > 0 ? (
                    <div className="space-y-4">
                        {memberships.map((membership) => (
                            <BarcodeCard
                                key={membership.id}
                                brandName={membership.brandName}
                                barcodeNumber={membership.barcodeNumber}
                                onClick={() => navigate(`/wallet/${membership.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📱</div>
                        <h2 className="text-xl font-semibold mb-2">등록된 멤버십이 없습니다</h2>
                        <p className="text-gray-600 mb-6">
                            첫 멤버십을 등록해보세요
                        </p>
                        <button
                            onClick={() => navigate('/membership/select')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            멤버십 등록하기
                        </button>
                    </div>
                )}
            </div>
            <BottomNav />
        </Layout>
    );
}
