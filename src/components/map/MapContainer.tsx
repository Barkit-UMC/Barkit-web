import { Status, Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
console.log("내 API 키:", GOOGLE_MAP_KEY);

interface MapContainerProps {
    center?: { lat: number; lng: number };
    zoom?: number;
    children?: React.ReactNode;
}

/**
 * [PAGE 16] 지도 띄우는 컨테이너
 * 구글 지도
 */

// 로딩 상태에 따른 렌더링 함수
const render = (status: Status) => {
    if (status === Status.FAILURE) return <div>지도를 불러오지 못했습니다.</div>;
    return <div className="flex items-center justify-center h-full">로딩 중...</div>;
};

export default function MapContainer({
    center = { lat: 37.5665, lng: 126.9780 }, // 서울 기본 좌표
    zoom = 15,
    children
}: MapContainerProps) {
    return (
        <div className="relative w-full h-full">
            <div className="relative w-full h-full">
            <Wrapper 
                apiKey={GOOGLE_MAP_KEY} // 여기에 실제 API 키를 넣으세요
                render={render}
                libraries={["places"]} // 향후 장소 검색 기능을 위해 미리 추가
            >
                <MapComponent center={center} zoom={zoom}>
                    {children}
                </MapComponent>
            </Wrapper>
        </div>
        </div>
    );
}

function MapComponent({ center, zoom, children }: { center: google.maps.LatLngLiteral, zoom: number, children?: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        if (ref.current && !map) {
            // 지도 초기화
            const newMap = new window.google.maps.Map(ref.current, {
                center,
                zoom,
                disableDefaultUI: true, // 버튼들을 커스텀 UI(MapHomePage)로 대체하므로 기본 UI는 끔
                zoomControl: false,
            });
            setMap(newMap);
        }
    }, [ref, map, center, zoom]);

    // 위치 변경 시 지도 중심 이동
    useEffect(() => {
        if (map) {
            map.panTo(center);
        }
    }, [center, map]);

    return (
        <>
            <div ref={ref} className="w-full h-full" id="map" />
            {/* 구글 지도 위에 리액트 컴포넌트(마커 등)를 띄우기 위해 
              Context를 만들거나, children을 전달합니다. 
            */}
            {map && React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // child에 map 객체를 주입하여 마커가 지도를 참조할 수 있게 함
                    return React.cloneElement(child as React.ReactElement<any>, { map });
                }
            })}
        </>
    );
}