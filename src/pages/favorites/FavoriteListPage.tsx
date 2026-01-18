import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconTrashOff from '../../assets/icons/trash/trash-off.svg';
import iconTrashOn from '../../assets/icons/trash/trash-on.svg';

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
        <Layout showBottomNav={true}>
            {/* 상단 헤더 */}
            <div className="w-full h-[128px] relative flex items-end border-b border-gray-200">
                {/* 뒤로가기 */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-[16px] pb-4 p-2 rounded-full"
                    aria-label="뒤로가기"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* 타이틀 */}
                <h1 className="w-full text-center text-xl font-semibold pb-4">
                    매장 즐겨찾기
                </h1>
            </div>

            {/* 내용 영역 */}
            <div className="p-8 bg-gray-50">
                {/* 안내 헤더 */}
                <header className="flex items-center justify-between pl-4 pr-4 ">
                    <h2 className="text-lg font-semibold pb-2">
                        최대 5개 매장 선택
                    </h2>

                    {/* 삭제 모드 버튼 (지금은 off 상태) */}
                    <img
                        src={iconTrashOff}
                        alt="즐겨찾기 삭제 아이콘"
                        className="w-10 h-10"
                    />
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
                                        w-12 h-12
                                        flex items-center justify-center
                                        rounded-lg
                                        bg-gray-200
                                        hover:bg-gray-300
                                    "
                                    aria-label="매장 추가"
                                >
                                    <PlusIcon />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 즐겨찾기 매장 카드 리스트 */}
            </div>
        </Layout>
    );
}

/* 플러스 아이콘 */
function PlusIcon() {
    return (
        <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
            />
        </svg>
    );
}
