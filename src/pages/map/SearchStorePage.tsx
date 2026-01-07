import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';

/**
 * [PAGE 18] 매장 검색 페이지
 */
export default function SearchStorePage() {
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: API에서 매장 검색
    const searchResults = [
        { id: 1, name: '스타벅스 강남점', address: '서울 강남구 테헤란로', distance: 250 },
        { id: 2, name: '스타벅스 역삼점', address: '서울 강남구 역삼동', distance: 450 },
        { id: 3, name: 'GS25 강남점', address: '서울 강남구 강남대로', distance: 180 },
    ];

    const filteredResults = searchQuery
        ? searchResults.filter(store =>
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : searchResults;

    return (
        <Layout>
            <Header title="매장 검색" />
            <div className="p-6">
                <Input
                    type="text"
                    placeholder="매장명 또는 주소 검색"
                    value={searchQuery}
                    onChange={setSearchQuery}
                />

                <div className="mt-6 space-y-3">
                    {filteredResults.map((store) => (
                        <button
                            key={store.id}
                            className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:border-blue-500 hover:shadow-md transition-all"
                        >
                            <h3 className="font-semibold mb-1">{store.name}</h3>
                            <p className="text-sm text-gray-600">{store.address}</p>
                            <p className="text-xs text-blue-600 mt-1">{store.distance}m</p>
                        </button>
                    ))}
                </div>

                {filteredResults.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        검색 결과가 없습니다
                    </div>
                )}
            </div>
        </Layout>
    );
}
