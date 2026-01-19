import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconShare from '../../assets/icons/map/navigation.svg'; // 공유 아이콘 경로 확인 필요
import kt from '../../assets/icons/memberships/kt.svg';
import oliveyoung from '../../assets/icons/memberships/oliveyoung.svg';
import sampleimg from '../../assets/images/map_image_sample.png';
import Header from '../../components/common/Header';
import MapContainer from '../../components/map/MapContainer';

export default function MapDetailPage() {

    // 실제로는 id를 이용해 API에서 데이터를 가져와야 합니다.
    const storeData = {
        name: '올리브영 성수',
        category: '드럭스토어',
        distance: '0.55km',
        address: '서울 성동구 연무장7길 13 팩토리얼',
        location: { lat: 37.5445, lng: 127.0560 },
        images: [
            sampleimg, // 임시 이미지
            sampleimg,
            sampleimg,
            sampleimg,
            sampleimg
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
                        <button className="p-2 rounded-full transition-transform active:scale-95">
                            <img src={iconShare} alt="공유" className="w-8 h-8" />
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
                <div className="flex gap-3 overflow-x-auto px-6 scrollbar-hide h-48 min-h-[12rem]">
                    {storeData.images.map((img, idx) => (
                        <img 
                            key={idx} 
                            src={img} 
                            className="w-72 h-48 object-cover rounded-2xl" 
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

                    {/* --- 새로 추가되는 지도 섹션 시작 --- */}
                    <div className="mt-4">
                        {/* 지도 이미지 영역 */}
                        {/* overflow-hidden과 rounded-2xl을 주어 지도가 둥글게 잘리도록 함 */}
                        <div className="relative w-full h-40 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            
                            {/* 구글 지도 컴포넌트 삽입 */}
                            <MapContainer 
                                center={storeData.location} 
                                zoom={17} // 상세 페이지니까 조금 더 확대
                                showMyLocation={false}
                            >
                                {/* 매장 위치 마커 */}
                                {/* <MapMarker 
                                    position={storeData.location} 
                                    title={storeData.name}
                                /> */}
                            </MapContainer>

                            {/* 우측 상단 확대 아이콘 버튼 (z-index를 주어 지도 위에 띄움) */}
                            <button className="absolute top-2 right-2 bg-white p-1.5 rounded-lg shadow-md border border-gray-100 z-10 hover:bg-gray-50">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                        </div>

                        {/* 경로 안내 문구 */}
                        <div className="mt-4 space-y-4">
                            <p className="text-gray-600 text-[15px]">
                                성수역 4번 출구에서 79m 도보 3분에 위치합니다.
                            </p>
                            
                            <div className="space-y-1">
                                <p className="text-gray-500 text-[15px] font-medium">- 주차장 안내</p>
                                <p className="text-gray-600 text-[15px]">
                                    건물 내 지하 주차장을 이용하실 수 있습니다.
                                </p>
                            </div>
                        </div>
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