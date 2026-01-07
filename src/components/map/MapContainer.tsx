import React from 'react';

interface MapContainerProps {
    center?: { lat: number; lng: number };
    zoom?: number;
    children?: React.ReactNode;
}

/**
 * [PAGE 16] 지도 띄우는 컨테이너
 * 카카오맵 또는 네이버맵을 표시하는 컨테이너
 * TODO: 카카오맵 API 통합 필요
 */
export default function MapContainer({
    center = { lat: 37.5665, lng: 126.9780 }, // 서울 기본 좌표
    zoom = 15,
    children
}: MapContainerProps) {
    return (
        <div className="relative w-full h-full">
            {/* TODO: 카카오맵 또는 네이버맵 API 통합 */}
            <div
                id="map"
                className="w-full h-full bg-gray-200 flex items-center justify-center"
            >
                <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p>지도 API 연동 예정</p>
                </div>
            </div>
            {children}
        </div>
    );
}
