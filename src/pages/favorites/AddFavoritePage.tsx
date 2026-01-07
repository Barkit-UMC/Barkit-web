import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

/**
 * [PAGE 13] 즐겨찾기 추가 페이지
 */
export default function AddFavoritePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: API에서 매장 검색
    const searchResults = [
        { id: 1, name: '스타벅스 강남점', address: '서울 강남구 테헤란로', distance: 250 },
        { id: 2, name: '스타벅스 역삼점', address: '서울 강남구 역삼동', distance: 450 },
    ];

    const handleAddFavorite = (storeId: number) => {
        // TODO: 즐겨찾기 추가 API 호출
        console.log('Add to favorites:', storeId);
        navigate('/favorites');
    };

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
                    {searchResults.map((store) => (
                        <div
                            key={store.id}
                            className="p-4 bg-white border border-gray-200 rounded-lg"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">{store.name}</h3>
                                    <p className="text-sm text-gray-600">{store.address}</p>
                                    <p className="text-xs text-blue-600 mt-1">{store.distance}m</p>
                                </div>
                                <button
                                    onClick={() => handleAddFavorite(store.id)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    추가
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
