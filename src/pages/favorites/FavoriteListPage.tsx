import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';

/**
 * [PAGE 13] 즐겨찾는 매장 목록
 */
export default function FavoriteListPage() {
    const navigate = useNavigate();

    // TODO: API에서 즐겨찾기 목록 가져오기
    const favorites = [
        { id: 1, name: '스타벅스 강남점', address: '서울 강남구 테헤란로', distance: 250 },
        { id: 2, name: 'GS25 역삼점', address: '서울 강남구 역삼동', distance: 180 },
    ];

    return (
        <Layout>
            <Header
                title="즐겨찾는 매장"
            />

            <div className="p-6">
                {favorites.length > 0 ? (
                    <div className="space-y-3">
                        {favorites.map((store) => (
                            <div
                                key={store.id}
                                className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">{store.name}</h3>
                                        <p className="text-sm text-gray-600">{store.address}</p>
                                        <p className="text-xs text-blue-600 mt-1">{store.distance}m</p>
                                    </div>
                                    <button
                                        className="text-yellow-500 text-2xl"
                                        onClick={() => {/* TODO: 즐겨찾기 해제 */ }}
                                    >
                                        ⭐
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">⭐</div>
                        <h2 className="text-xl font-semibold mb-2">즐겨찾는 매장이 없습니다</h2>
                        <p className="text-gray-600">
                            자주 가는 매장을 추가해보세요
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
