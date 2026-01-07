import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';

/**
 * [PAGE 5] 브랜드 검색 페이지
 */
export default function BrandSearchPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: API에서 브랜드 검색
    const allBrands = [
        { id: 1, name: '스타벅스', category: '카페' },
        { id: 2, name: 'GS25', category: '편의점' },
        { id: 3, name: 'CU', category: '편의점' },
        { id: 4, name: '올리브영', category: '뷰티' },
        { id: 5, name: '다이소', category: '생활용품' },
        { id: 6, name: '이마트24', category: '편의점' },
        { id: 7, name: '투썸플레이스', category: '카페' },
        { id: 8, name: '롯데리아', category: '패스트푸드' },
    ];

    const filteredBrands = searchQuery
        ? allBrands.filter(brand =>
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allBrands;

    return (
        <Layout>
            <Header title="브랜드 검색" />
            <div className="p-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="브랜드명을 검색하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>

                <div className="space-y-2">
                    {filteredBrands.map((brand) => (
                        <button
                            key={brand.id}
                            onClick={() => navigate(`/membership/input-number/${brand.id}`)}
                            className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:border-blue-500 hover:shadow-md transition-all"
                        >
                            <div className="font-medium">{brand.name}</div>
                            <div className="text-sm text-gray-500">{brand.category}</div>
                        </button>
                    ))}
                </div>

                {filteredBrands.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        검색 결과가 없습니다
                    </div>
                )}
            </div>
        </Layout>
    );
}
