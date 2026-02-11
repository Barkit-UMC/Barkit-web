import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { mapApi, type StoreDetail } from '../../api/map';
import Layout from '../../components/common/Layout';
import iconShare from '../../assets/icons/map/navigation.svg'; // 공유 아이콘 경로 확인 필요
import kt from '../../assets/icons/memberships/kt.svg';
import oliveyoung from '../../assets/icons/memberships/cjone.svg';
import sampleimg from '../../assets/images/map_image_sample.png';
import Header from '../../components/common/Header';
import MapContainer from '../../components/map/MapContainer';
import MapMarker from '../../components/map/MapMarker';

export default function MapDetailPage() {
    const { googleId } = useParams<{ googleId: string }>();

    // 상태 관리
    const [storeData, setStoreData] = useState<StoreDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
    const fetchDetail = async () => {
        if (!googleId) return;

        try {
            // 위치 정보를 못 가져올 상황을 대비해 기본값 설정
            let lat = 37.5445;
            let lng = 127.0560;

            try {
                const pos: any = await new Promise((res, rej) => {
                    navigator.geolocation.getCurrentPosition(res, rej, { timeout: 3000 });
                });
                lat = pos.coords.latitude;
                lng = pos.coords.longitude;
            } catch (e) {
                alert(`위치 정보를 가져오지 못해 기본 좌표를 사용합니다.`);
                console.warn("위치 정보를 가져오지 못해 기본 좌표를 사용합니다.");
            }

            const response = await mapApi.getStoreDetail(googleId, lat, lng);

            if (response.isSuccess) {
                setStoreData(response.result);
            } else {
                alert(`에러 발생: ${response.message}`);
            }
        } catch (error) {
            console.error("4. 치명적 에러 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchDetail();
}, [googleId]);

    if (loading) return <Layout showBottomNav={false}><div className="flex h-full items-center justify-center">로딩 중...</div></Layout>;
    if (!storeData) return <Layout showBottomNav={false}><div className="flex h-full items-center justify-center">데이터가 없습니다.</div></Layout>;

    // 상세 페이지 네비게이션
    const handleMembershipClick = (userMembershipId: string) => {
        // 멤버십 상세 페이지로 이동 (ID를 경로 파라미터로 전달)
        navigate(`/map/membership/${userMembershipId}`);
    };

    // 복사 함수 추가
    const handleCopyPhone = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('전화번호가 클립보드에 복사되었습니다.');
            })
            .catch((err) => {
                console.error('복사 실패:', err);
            });
    };

    return (
        <Layout showBottomNav={false}>
            <div className="flex flex-col h-full bg-white overflow-y-auto scrollbar-hide pb-10">
                
               {/* 2. 공통 Header 사용 */}
                <Header 
                    showBackButton={true}
                    rightAction={
                        <button 
                            className="p-2 rounded-full transition-transform active:scale-95"
                            onClick={() => window.open(`https://map.kakao.com/link/to/${storeData.name},${storeData.location.lat},${storeData.location.lng}`)}
                            aria-label = "길찾기"
                        >
                            <img src={iconShare} alt="공유" className="w-8 h-8" />
                        </button>
                    }
                />

                {/* 2. 매장 기본 정보 */}
                <div className="px-6 py-4 pt-20">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
                    </div>
                    <p className="text-gray-500 mt-1">
                        <span className="font-semibold text-gray-700">{storeData.distance}Km</span>
                        <span className="mx-2">|</span>
                        {storeData.contact.address}
                    </p>
                </div>

                {/* 3. 이미지 갤러리 (가로 스크롤) */}
                <div className="flex gap-3 overflow-x-auto px-6 scrollbar-hide h-48 min-h-[12rem] mb-2">
                    {storeData.photos.map((photo, idx) => (
                        <img 
                            key={idx} 
                            src={photo.url} 
                            className="w-72 h-48 object-cover rounded-2xl" 
                            alt={`store-${idx}`} 
                        />
                    ))}
                </div>

                <hr className="my-4 border-gray-100 border-[6px]" />

                {/* 4. 멤버십 섹션 (수정된 부분) */}
                <div className="px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 pt-1">보유 멤버십</h2>
                    <div className="flex gap-3">
                        {storeData.userMembership.map((m, i) => (
                            <img key={i} src={m.logoUrl} className="w-14 h-14 rounded-xl border" alt={m.name} title={m.name} 
                                onClick={() => handleMembershipClick(m.userMembershipId)}/>
                        ))}
                    </div>
                </div>

                <hr className="my-4 border-gray-100 border-[6px]" />
                
                <div className="px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 pt-1">전체 멤버십</h2>
                    <div className="flex gap-3">
                        {storeData.membership.map((m, i) => (
                            <img key={i} src={m.logoUrl} className="w-14 h-14 rounded-xl border" alt={m.name} title={m.name} />
                        ))}
                    </div>
                </div>

                <hr className="my-4 border-gray-100 border-[6px]" />

                {/* 5. 상세 정보 리스트 */}
                <div className="px-6 space-y-3">
                    <h2 className="text-xl font-bold text-black mb-3">기본 정보</h2>
                    
                    <div className="flex gap-4">
                        <span className="w-20 text-black font-medium">영업시간</span>
                        <span className="flex-1 text-gray-800">
                            {typeof storeData.hourInfo.isOpen === 'boolean' && (
                                <span className={storeData.hourInfo.isOpen ? "text-cyan-500 mr-2" : "text-red-500 mr-2"}>
                                    {storeData.hourInfo.isOpen ? "영업중" : "영업종료"}
                                </span>
                            )}
                            
                            {/* 2. 요일 텍스트 출력 */}
                            {storeData.hourInfo.weekdayText}
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-black font-medium">전화번호</span>
                        <div className="flex-1 flex items-center gap-2 text-gray-800">
                            {storeData.contact.phoneNumber}
                            <button 
                                className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-400"
                                onClick={() => handleCopyPhone(storeData.contact.phoneNumber)}
                            >
                                복사
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-black font-medium">홈페이지</span>
                        <span className="flex-1 text-gray-400 underline truncate">{storeData.contact.homepage}</span>
                    </div>

                    <div className="flex gap-4">
                        <span className="w-20 text-black font-medium">주소</span>
                        <span className="flex-1 text-gray-800">{storeData.contact.address}</span>
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
                                <MapMarker 
                                    position={storeData.location} 
                                    title={storeData.name}
                                />
                            </MapContainer>

                            {/* 우측 상단 확대 아이콘 버튼 (z-index를 주어 지도 위에 띄움) */}
                            <button className="absolute top-2 right-2 bg-white p-1.5 rounded-lg shadow-md border border-gray-100 z-10 hover:bg-gray-50">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}