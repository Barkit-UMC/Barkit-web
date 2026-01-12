import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconBack from '../../assets/icons/map/back.svg'; // 뒤로가기 아이콘 경로 확인 필요
import iconShare from '../../assets/icons/map/navigation.svg'; // 공유 아이콘 경로 확인 필요
import kt from '../../assets/icons/memberships/kt.svg';
import oliveyoung from '../../assets/icons/memberships/oliveyoung.svg';
import Header from '../../components/common/Header';

export default function MapDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 실제로는 id를 이용해 API에서 데이터를 가져와야 합니다.
    const storeData = {
        name: '올리브영 성수',
        category: '드럭스토어',
        distance: '0.55km',
        address: '서울 성동구 연무장7길 13 팩토리얼',
        images: [
            'https://via.placeholder.com/300x200', // 임시 이미지
            'https://via.placeholder.com/300x200',
            'https://via.placeholder.com/300x200'
        ],
        hours: '08:00 - 22:00',
        phone: '010-1234-4567',
        website: 'http://blog.naver.com/rkskek',
        facilities: '무선인터넷, 주차, 예약, 대기공간',
        description: '[새로운 차원의 경험 공간, 올리브영N 성수]\n\n더 많은 고객님께 뷰티 케어 서비스를 제공하기 위해 12월 8일(월)부터 서비스 운영 시간이 조정됩니다.'
    };

    return (
        <Layout showBottomNav={false}>
            <div className="flex flex-col h-full bg-white overflow-y-auto pb-10">
                
               {/* 2. 공통 Header 사용 */}
                <Header 
                    showBackButton={true}
                    rightAction={
                        <button className="p-2 bg-cyan-400 rounded-full transition-transform active:scale-95">
                            <img src={iconShare} alt="공유" className="w-5 h-5 shadow-sm" />
                        </button>
                    }
                />

                {/* 2. 매장 기본 정보 */}
                <div className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
                        <span className="text-gray-300 text-lg">{storeData.category}</span>
                    </div>
                    <p className="text-gray-500 mt-1">
                        <span className="font-semibold text-gray-700">{storeData.distance}</span>
                        <span className="mx-2">|</span>
                        {storeData.address}
                    </p>
                </div>

                {/* 3. 이미지 갤러리 (가로 스크롤) */}
                <div className="flex gap-3 overflow-x-auto px-6 scrollbar-hide">
                    {storeData.images.map((img, idx) => (
                        <img 
                            key={idx} 
                            src={img} 
                            className="w-72 h-48 object-cover rounded-2xl flex-shrink-0" 
                            alt={`store-${idx}`} 
                        />
                    ))}
                </div>

                <hr className="my-8 border-gray-100 border-[6px]" />

                {/* 4. 멤버십 섹션 */}
                <div className="px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">적용 가능 보유 멤버십</h2>
                    <div className="flex gap-3">
                        <img src={kt} alt="KT" className="w-12 h-12 rounded-xl shadow-sm" />
                        <img src={oliveyoung} alt="Olive" className="w-12 h-12 rounded-xl shadow-sm" />
                    </div>
                </div>

                <hr className="my-8 border-gray-100 border-[1px]" />

                {/* 5. 상세 정보 리스트 */}
                <div className="px-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">기본 정보</h2>
                    
                    <div className="flex gap-4">
                        <span className="w-20 text-gray-500 font-medium">영업시간</span>
                        <span className="flex-1 text-gray-800"><span className="text-cyan-500 mr-2">영업 중</span>{storeData.hours}</span>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-gray-500 font-medium">전화번호</span>
                        <div className="flex-1 flex items-center gap-2 text-gray-800">
                            {storeData.phone}
                            <button className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-400">복사</button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-gray-500 font-medium">홈페이지</span>
                        <span className="flex-1 text-gray-400 underline truncate">{storeData.website}</span>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-gray-500 font-medium">편의시설</span>
                        <span className="flex-1 text-gray-800">{storeData.facilities}</span>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-gray-500 font-medium">주소</span>
                        <span className="flex-1 text-gray-800">{storeData.address}</span>
                    </div>
                </div>

                <hr className="my-8 border-gray-100 border-[6px]" />

                {/* 6. 장소 소개 */}
                <div className="px-6 pb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">장소 소개</h2>
                    <div className="bg-gray-50 p-5 rounded-2xl">
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {storeData.description}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}