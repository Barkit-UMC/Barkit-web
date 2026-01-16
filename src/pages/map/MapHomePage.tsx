import Layout from '../../components/common/Layout';
import MapContainer from '../../components/map/MapContainer';

/**
 * [PAGE 16] 지도 메인 페이지
 */
export default function MapHomePage() {
    // TODO: 현재 위치 가져오기
    const currentLocation = { lat: 37.5665, lng: 126.9780 };

    return (
        <Layout showBottomNav>
            <div className="relative h-screen">
                <MapContainer center={currentLocation} zoom={15}>
                    {/* TODO: 매장 마커들 표시 */}
                </MapContainer>

                {/* 검색 바 */}
                <div className="absolute top-4 left-4 right-4">
                    <button
                        onClick={() => {/* TODO: 검색 페이지로 이동 */ }}
                        className="w-full p-4 bg-white rounded-lg shadow-lg flex items-center gap-3"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-500">매장 검색</span>
                    </button>
                </div>

                {/* 현재 위치 버튼 */}
                <button
                    className="absolute bottom-24 right-4 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    onClick={() => {/* TODO: 현재 위치로 이동 */ }}
                >
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </Layout>
    );
}
