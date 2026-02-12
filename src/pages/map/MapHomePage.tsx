import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import MapContainer from '../../components/map/MapContainer';
import iconSearch from '../../assets/icons/map/search.svg';
import iconFilter from '../../assets/icons/map/mapFilter.svg';
import iconLoc from '../../assets/icons/map/current_loc.svg';
import iconLocOn from '../../assets/icons/map/current_loc_on.svg';
import iconMapPin from '../../assets/icons/map/loc.svg'
import iconMyLoc from '../../assets/icons/map/sort_loc.svg'
import SortBottomSheet from '../../components/common/BottomSheet';
import SearchResultList from '../../components/map/SearchResultList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { mapApi } from '../../api/map';
import MapMarker from '../../components/map/MapMarker';
import LoadingDots from '../../components/common/LoadingDots';

const search_icon = iconSearch;
const filter_icon = iconFilter;
const loc_icon = iconLoc;
const loc_icon_on = iconLocOn;
const mapPinIcon = iconMapPin;
const myLocIcon = iconMyLoc;

const CATEGORY_MAP: Record<string, string> = {
    '전체': 'ALL',
    '엔터': 'ENTER',
    '쇼핑': 'SHOPPING',
    '카페': 'CAFE',
    '식당': 'FOOD'
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

/**
 * [PAGE 16] 지도 메인 페이지
 */
export default function MapHomePage() {
    const [selectedCategory, setSelectedCategory] = useState('전체');

    const navigate = useNavigate();

    // 1. 지도 중심 좌표를 State로 관리 (초기값: 서울 시청)
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);

    // 2. 추적 상태 관리
    const [isTracking, setIsTracking] = useState(false);

    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState('distance');


    const [searchText, setSearchText] = useState(''); // 검색어 상태
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // 바텀시트 열림 상태

    // const latestCoords = useRef<{lat: number, lng: number} | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        // queryKey에 좌표값들을 개별적으로 포함시켜 값이 변할 때마다 트리거
        queryKey: ['stores', searchText, selectedCategory, currentSort, currentLocation?.lat, currentLocation?.lng, userLocation?.lat, userLocation?.lng],
        queryFn: ({ pageParam = 0 }) =>
            mapApi.searchStores(
                {
                    query: searchText,
                    userlat: userLocation?.lat, // useRef.current 대신 state 사용
                    userlng: userLocation?.lng,
                    centerlat: currentLocation?.lat,
                    centerlng: currentLocation?.lng,
                },
                pageParam as number,
                // distanceType 결정 (내 위치 기준인지 지도 중심 기준인지)
                currentSort === 'distance' ? 'CURRENT' : 'CENTER',
                // 카테고리: image_992e58 매핑 값 전달
                CATEGORY_MAP[selectedCategory],
                20
            ),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
        // 두 좌표가 모두 있을 때만 쿼리 실행
        enabled: !!currentLocation && !!userLocation,
    });

    // 데이터 추출
    const allStores = data?.pages.flatMap(page => page.result.content) || [];

    useEffect(() => {
        if (!navigator.geolocation) return;

        // watchPosition은 위치가 바뀔 때마다 실행되며, 시스템이 이미 좌표를 들고 있게 만듭니다.
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPos = { lat: latitude, lng: longitude };

                // latestCoords.current = newPos; // Ref에 실시간 좌표 저장
                setUserLocation(newPos);

                // 앱 처음 실행 시에만 지도를 내 위치로 이동
                if (!currentLocation) {
                    setCurrentLocation(newPos);
                    setIsTracking(true);
                }
            },
            (error) => console.error("위치 추적 오류:", error),
            {
                enableHighAccuracy: false, // 속도를 위해 처음엔 false, 필요시 true
                maximumAge: 1000,          // 1초 이내 캐시된 위치 사용 (매우 빠름)
                timeout: 5000
            }
        );

        return () => navigator.geolocation.clearWatch(watchId); // 언마운트 시 해제
    }, [currentLocation]);

    // 3. 현재 위치로 이동하는 함수
    const handleMoveToCurrentLocation = () => {
        // state인 userLocation에 값이 있다면 바로 이동
        if (userLocation) {
            setCurrentLocation({ ...userLocation });
            setIsTracking(true);
        } else {
            // 만약 watchPosition에서 아직 값을 못 잡았다면 단발성으로 요청
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
                    setUserLocation(newPos); // 상태 업데이트
                    setCurrentLocation(newPos); // 지도 중심 이동
                    setIsTracking(true);
                },
                (error) => console.error("위치 획득 실패:", error),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        }
    };

    // 바텀시트 드래그 관련 상태
    const [sheetY, setSheetY] = useState(0); // 드래그에 따른 Y축 이동 거리
    const [isDragging, setIsDragging] = useState(false); // 드래그 중 여부
    const startY = useRef(0); // 드래그 시작 Y 좌표

    // 터치 시작
    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    // 터치 이동
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY.current;

        // 아래로 드래그(deltaY > 0)할 때만 이동
        if (deltaY > 0) {
            setSheetY(deltaY);
        }
    };

    // 터치 끝
    const handleTouchEnd = () => {
        setIsDragging(false);
        // 50px 이상 내렸으면 닫기
        if (sheetY > 50) {
            setIsBottomSheetOpen(false);
        }
        // 초기화 (닫히든 안 닫히든 위치는 리셋해둬야 다음 열 때 정상)
        setSheetY(0);
    };

    // 위치 정보가 올 때까지 '로딩'을 보여주어 지도가 0px로 튀는 것을 방지
    if (!currentLocation) {
        return (
            <Layout showBottomNav>
                <div className="flex flex-col items-center justify-center w-full h-[calc(100dvh-64px)]">
                    <LoadingDots />
                </div>
            </Layout>
        );
    }

    const sortOptions = [
        {
            id: 'popular', // 정렬 방식 아이디 수정
            label: '지도 중심 거리순',
            icon: mapPinIcon
        },
        {
            id: 'distance',
            label: '현재 내 위치 거리순',
            icon: myLocIcon
        },
    ];



    return (
        <Layout showBottomNav>
            <div className="relative flex-1 w-full h-full min-h-[calc(100dvh-64px)] bg-gray-100 overflow-hidden">
                {/* 1. 지도 배경 */}
                {/* z-0으로 설정하여 다른 UI들이 위에 뜨도록 함 */}
                <div className="absolute inset-0 z-0">
                    <MapContainer
                        center={currentLocation}
                        zoom={15}
                        onDragStart={() => {
                            setIsTracking(false);
                        }}
                        onCenterChanged={(newPos: { lat: number, lng: number }) => {
                            setCurrentLocation(newPos);
                        }}
                    >
                        {allStores.map((store) => (
                            <MapMarker
                                key={store.googleId}
                                position={{
                                    lat: store.location.lat,
                                    lng: store.location.lng
                                }}
                                title={store.name.text}
                                onClick={() => navigate(`/map/${store.googleId}`, { state: { membershipIds: store.membershipIds || [] } })}
                            />
                        ))}
                    </MapContainer>
                </div>

                {/* 2. 상단 플로팅 UI (검색창 + 카테고리) */}
                <div className="absolute top-3 left-0 right-0 z-31 flex flex-col gap-4 pt-14 pb-4">

                    {/* 검색바 & 필터 버튼 Row */}
                    <div className="flex items-center pl-5 pr-5 gap-3">
                        {/* 검색 입력창 */}
                        <div className="flex-1 h-12 bg-white rounded-xl shadow-md flex items-center px-4 transition-transform active:scale-[0.98]">
                            <img
                                src={search_icon}
                                alt="검색"
                                className="w-10 h-5 object-contain opacity-60" // 이미지 크기 및 투명도 조절
                            />
                            <input
                                type="text"
                                value={searchText}
                                placeholder="멤버십 혹은 매장명을 입력하세요"
                                className="w-full ml-3 text-sm bg-transparent outline-none text-gray-700"
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    // 글자를 입력하면 바텀시트를 엽니다.
                                    if (e.target.value.length > 0) setIsBottomSheetOpen(true);
                                    else setIsBottomSheetOpen(false);
                                }}
                                onFocus={() => {
                                    if (searchText.length > 0) setIsBottomSheetOpen(true);
                                }}
                            />
                        </div>

                        {/* 필터 버튼 */}
                        <button
                            className="h-12 w-12 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 active:bg-gray-50"
                            onClick={() => setIsSortModalOpen(true)}
                        >
                            <img
                                src={filter_icon}
                                alt="필터"
                                className="w-6 h-6 object-contain"
                            />
                        </button>
                    </div>

                    {/* 카테고리 칩 (가로 스크롤) */}
                    <div className="flex gap-2 pl-5 pr-5 !overflow-x-auto pb-2 scrollbar-hide">
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

                {/* 3. 검색 결과 바텀시트 영역 */}
                <div className="fixed inset-0 z-30 pointer-events-none"> {/* 부모 컨테이너는 클릭 통과 */}

                    {/* 배경 오버레이: 시트가 열렸을 때만 나타나며, 클릭 시 시트를 닫음 */}
                    {isBottomSheetOpen && (
                        <div
                            className="absolute inset-0 bg-black/10 pointer-events-auto" // 투명도 조절 가능 (bg-transparent도 가능)
                            onClick={() => setIsBottomSheetOpen(false)}
                        />
                    )}

                    {/* 바텀시트 본체 */}
                    <div
                        className={`absolute inset-x-0 bottom-0 bg-white rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] 
                            ease-out pointer-events-auto
                            ${isBottomSheetOpen ? '' : 'translate-y-full'}`}
                        style={{
                            height: '55%',
                            transform: isBottomSheetOpen ? `translateY(${sheetY}px)` : undefined,
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* 바텀시트 핸들러 (노란색 바 영역) */}
                        <div className="flex justify-center !pt-3 !pb-3 cursor-pointer" onClick={() => setIsBottomSheetOpen(false)}>
                            <div className="w-14 h-3 bg-gray-200 rounded-full" />
                        </div>

                        {/* 리스트 컴포넌트 */}
                        <div className="h-full overflow-hidden pb-10"> {/* 내부 스크롤을 위해 높이 확보 */}
                            <SearchResultList
                                results={allStores}
                                fetchNextPage={fetchNextPage}
                                hasNextPage={hasNextPage}
                                isFetchingNextPage={isFetchingNextPage}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. 현재 위치 버튼 (우측 하단) */}
                <button
                    className="absolute bottom-10 right-3 rounded-full transition-shadow z-10 w-14 h-14 overflow-hidden"
                    onClick={handleMoveToCurrentLocation}
                >
                    <img
                        src={isTracking ? iconLocOn : iconLoc}
                        alt="현재위치이동"
                        className="w-full h-full object-cover"
                    />
                </button>

                {/* 4. 재사용 정렬 모달 */}
                {isSortModalOpen && (
                    <SortBottomSheet
                        options={sortOptions}
                        selectedValue={currentSort}
                        onSelect={(id) => setCurrentSort(id)}
                        onClose={() => setIsSortModalOpen(false)}
                    />
                )}
            </div>
        </Layout>
    );
}