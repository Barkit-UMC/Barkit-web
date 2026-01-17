import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import iconSearch from '../../assets/icons/search/search.svg';
import MembershipSearchBar from '../../components/common/MembershipSearchBar';
import FlippableBarcodeCard from '../../components/barcode/FlippableBarcodeCard';
import iconKt from '../../assets/icons/stores/kt.svg';

export default function BarcodeListPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // 멤버십 (임시)
    const memberships = [
        { 
            id: 1, 
            brandName: '브랜드명',
            brandLogo: undefined,
            points: 5000,
            color: 'bg-gradient-to-br from-purple-600 to-purple-700',
        },
        { 
            id: 2, 
            brandName: 'KT', 
            brandLogo: iconKt,
            points: 6000,
            color: 'bg-gradient-to-br from-teal-300 to-teal-400',
        },
        { 
            id: 3, 
            brandName: '브랜드명',
            brandLogo: undefined,
            points: 3000,
            color: 'bg-gradient-to-br from-red-400 to-red-500',
        },
        { 
            id: 4, 
            brandName: '브랜드명',
            brandLogo: undefined,
            points: 8000,
            color: 'bg-gradient-to-br from-orange-400 to-orange-500',
        },
    ];

    const filteredMemberships = memberships.filter(membership =>
        membership.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout showBottomNav>
            <div className="bg-[#F9F9F9] min-h-screen">
                {/* 헤더 */}
                <Header title="나의 바코드" />

                {/* 검색창 */}
                <div className="mt-8 mb-2">
                    <MembershipSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        iconSearch={iconSearch}
                    />
                </div>

                {/* 카드 리스트 */}
                <div className="px-4 pt-6 space-y-5 flex flex-col items-center">
                    {filteredMemberships.length > 0 ? (
                        filteredMemberships.map((membership) => (
                            <div 
                                key={membership.id}
                                className="cursor-pointer w-[344px] h-[211.08px]"
                            >
                                <FlippableBarcodeCard
                                    key={membership.id}
                                    brandName={membership.brandName}
                                    brandLogo={membership.brandLogo}
                                    points={membership.points}
                                    color={membership.color}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}