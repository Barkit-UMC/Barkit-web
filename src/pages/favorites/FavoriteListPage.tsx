import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconTrashOff from '../../assets/icons/trash/trash-off.svg';
import iconTrashOn from '../../assets/icons/trash/trash-on.svg';
import { Plus, Store } from 'lucide-react';
import { useState } from 'react';
import StoreCard from '../../components/favorites/StoreCard';
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

    const [deleteMode, setDeleteMode] = useState(false);

    return (
        <Layout showBottomNav={true} >
            <Header title="즐겨찾는 매장" />
            {/* 내용 영역 */}
            <div className="pt-[160px] p-8 bg-gray-50 flex-1 overflow-y-auto">
                {/* 안내 헤더 */}
                <header className="flex items-center justify-between pl-4 pr-4 ">
                    <h2 className="text-lg font-semibold pb-2">
                        최대 5개 매장 선택
                    </h2>

                    {/* 삭제 모드 버튼 - 컬러체인지 자연스럽게 수정 ㄱㄱ */}
                    <button
                        onClick={() => setDeleteMode(!deleteMode)}
                        aria-label="즐겨찾기 삭제 모드 전환"
                        className="rounded-full"
                    >
                        <img
                            src={deleteMode ? iconTrashOn : iconTrashOff}
                            alt="삭제 모드 아이콘"
                            className="w-10 h-10"
                        />
                    </button>
                    
                </header>

                {/* 매장 아이콘 영역 */}
                <div
                    className="
                        mt-4 w-full h-20 rounded-2xl
                        bg-white p-4
                        flex justify-center
                    "
                >
                    <div className="flex flex-row gap-4">
                        {Array.from({ length: 5 }).map((_, idx) => {
                            const store = favorites[idx];

                            // 이미 선택된 매장
                            if (store) {
                                return (
                                    <div
                                        key={store.id}
                                        className="
                                            w-12 h-12
                                            flex items-center justify-center
                                            border border-gray-200
                                            rounded-lg
                                            bg-white
                                        "
                                    >
                                        <img
                                            src={store.icon || ''}
                                            alt={`${store.name} 아이콘`}
                                            className="w-8 h-8"
                                        />
                                    </div>
                                );
                            }

                            // 빈 슬롯 → 플러스 버튼
                            return (
                                <button
                                    key={`empty-${idx}`}
                                    onClick={() => navigate('/store/add')}
                                    className="
                                        group
                                        w-12 h-12
                                        flex items-center justify-center
                                        rounded-lg
                                        bg-gray-200
                                        hover:bg-gray-300 cursor-pointer
                                    "
                                    aria-label="매장 추가"
                                >
                                    <Plus className="w-6 h-6 text-gray-300 group-hover:text-gray-400" />

                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 즐겨찾기 매장 카드 리스트 */}
                <div className="mt-6 space-y-3 mb-20">
                    {favorites.map((store) => (
                        <StoreCard
                            key={store.id}
                            store={store}
                            deleteMode={deleteMode}
                        />
                    ))}
                    {favorites.map((store) => (
                        <StoreCard
                            key={store.id}
                            store={store}
                            deleteMode={deleteMode}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
