import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import BottomNav from '../../components/common/BottomNav';
import MapContainer from '../../components/map/MapContainer';
import StoreMarker from '../../components/map/StoreMarker';
import iconSearch from '../../assets/icons/map/search.svg';
import iconFilter from '../../assets/icons/map/mapFilter.svg';
import iconLoc from '../../assets/icons/map/current_loc.svg';
import iconLocOn from '../../assets/icons/map/current_loc_on.svg';

const search_icon = iconSearch; 
const filter_icon = iconFilter;
const loc_icon = iconLoc;
const loc_icon_on = iconLocOn;

const CATEGORIES = ['전체', '엔터', '쇼핑', '카페', '식당'];

/**
 * [PAGE 16] 지도 메인 페이지
 */
export default function MapHomePage() {
    const [selectedCategory, setSelectedCategory] = useState('전체');

    const [isTracking, setIsTracking] = useState(false);
    
    // TODO: 현재 위치 가져오기 (실제 로직 연결 필요)
    const currentLocation = { lat: 37.5665, lng: 126.9780 };

    return (
        <Layout showBottomNav>
            <div className="relative h-full w-full bg-gray-100">
                {/* 1. 지도 배경 */}
                {/* z-0으로 설정하여 다른 UI들이 위에 뜨도록 함 */}
                <div className="absolute inset-0 z-0">
                    <MapContainer center={currentLocation} zoom={15}>
                        {/* TODO: 매장 마커들 표시 */}
                        <div className="absolute top-1/2 left-1/2">
                            <StoreMarker 
                                storeName="스타벅스 서울시청점"
                                address="서울 중구 세종대로 110"
                                distance={150}
                                onClick={() => alert('매장 클릭!')}
                            />
                        </div>
                    </MapContainer>
                </div>

                {/* 2. 상단 플로팅 UI (검색창 + 카테고리) */}
                <div className="absolute top-3 left-3 right-3 z-10 flex flex-col gap-4 px-5 pt-14 pb-4">
                    
                    {/* 검색바 & 필터 버튼 Row */}
                    <div className="flex items-center gap-3">
                        {/* 검색 입력창 */}
                        <div className="flex-1 h-12 bg-white rounded-xl shadow-md flex items-center px-4 transition-transform active:scale-[0.98]">
                            <img 
                                src={search_icon} 
                                alt="검색" 
                                className="w-10 h-5 object-contain opacity-60" // 이미지 크기 및 투명도 조절
                            />
                            <input 
                                type="text"
                                placeholder="" 
                                className="w-full ml-3 text-base bg-transparent outline-none text-gray-700 placeholder-gray-400"
                                onClick={() => {/* TODO: 검색 페이지로 이동 로직 */}}
                            />
                        </div>

                        {/* 필터 버튼 */}
                        <button 
                            className="h-12 w-12 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 active:bg-gray-50"
                            onClick={() => {/* TODO: 필터 모달 오픈 */}}
                        >
                            <img 
                                src={filter_icon} 
                                alt="필터" 
                                className="w-6 h-6 object-contain" 
                            />
                        </button>
                    </div>

                    {/* 카테고리 칩 (가로 스크롤) */}
                    <div className="flex gap-2 !overflow-x-auto pb-2 scrollbar-hide">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex-shrink-0
                                    !px-5 !py-1.5 text-base rounded-full font-medium whitespace-nowrap transition-colors
                                    ${selectedCategory === category 
                                        ? 'bg-white text-gray-900 ring-1 ring-gray-200' 
                                        : 'bg-white text-gray-500 hover:bg-gray-50'}
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. 현재 위치 버튼 (우측 하단) */}
                <button
                    className="absolute bottom-24 right-3 rounded-full transition-shadow z-10 "
                    onClick={() => {
                        // 클릭 시 isTracking 상태를 토글
                        setIsTracking(!isTracking);
                        // TODO: 현재 위치로 이동 로직
                    }}
                >
                    {/* 다운받은 이미지를 사용하고 CSS 필터로 색상을 변경합니다. */}
                    <img
                        src={isTracking ? loc_icon_on : loc_icon}
                        alt="현재위치이동"
                        className="w-full h-full object-cover"
                    />
                </button>
            </div>
            <BottomNav />
        </Layout>
    );
}