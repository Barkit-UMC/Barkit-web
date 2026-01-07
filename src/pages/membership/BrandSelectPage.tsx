import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';

/**
 * [PAGE 4] 브랜드 선택 페이지
 */
export default function BrandSelectPage() {
    const navigate = useNavigate();

    // TODO: API에서 브랜드 목록 가져오기
    const popularBrands = [
        { id: 1, name: '스타벅스', logo: '☕' },
        { id: 2, name: 'GS25', logo: '🏪' },
        { id: 3, name: 'CU', logo: '🏪' },
        { id: 4, name: '올리브영', logo: '💄' },
        { id: 5, name: '다이소', logo: '🛍️' },
        { id: 6, name: '이마트24', logo: '🏪' },
    ];

    const handleBrandSelect = (brandId: number) => {
        navigate(`/membership/input-number/${brandId}`);
    };

    return (
        <Layout>
            <Header title="멤버십 등록" />
            <div className="p-6">
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/membership/search')}
                        className="w-full p-4 bg-gray-100 rounded-lg flex items-center gap-3 text-left"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-500">브랜드 검색</span>
                    </button>
                </div>

                <h2 className="text-lg font-semibold mb-4">인기 브랜드</h2>
                <div className="grid grid-cols-3 gap-4">
                    {popularBrands.map((brand) => (
                        <button
                            key={brand.id}
                            onClick={() => handleBrandSelect(brand.id)}
                            className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
                        >
                            <div className="text-4xl mb-2">{brand.logo}</div>
                            <span className="text-sm text-center">{brand.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
