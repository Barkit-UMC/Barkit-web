import { Status, Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, useState } from 'react';
import LoadingDots from '../common/LoadingDots';

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
console.log("내 API 키:", GOOGLE_MAP_KEY);

interface MapContainerProps {
    center?: { lat: number; lng: number };
    zoom?: number;
    children?: React.ReactNode;
    onDragStart?: () => void; // 지도를 드래그하기 시작할 때 실행될 함수
    onCenterChanged?: (pos: { lat: number; lng: number }) => void
    showMyLocation?: boolean;
}

/**
 * [PAGE 16] 지도 띄우는 컨테이너
 * 구글 지도
 */

// 로딩 상태에 따른 렌더링 함수
const render = (status: Status) => {
    // 1. 에러 발생 시
    if (status === Status.FAILURE) {
        return (
            <div className="flex items-center justify-center py-20 text-gray-500">
                지도를 불러오지 못했습니다.
            </div>
        );
    }

    // 2. 로딩 중일 때 (검색 중 포함)
    if (status === Status.LOADING) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[calc(100dvh-64px)]">
                <LoadingDots />
            </div>
        );
    }

    return <></>;
};

export default function MapContainer({
    center = { lat: 37.5665, lng: 126.9780 }, // 서울 기본 좌표
    zoom = 15,
    children,
    onDragStart,
    onCenterChanged,
    showMyLocation = true
}: MapContainerProps) {
    return (
        <div className="relative w-full h-full">
            <div className="relative w-full h-full">
                <Wrapper 
                    apiKey={GOOGLE_MAP_KEY} // 여기에 실제 API 키를 넣으세요
                    render={render}
                    libraries={["places"]} // 향후 장소 검색 기능을 위해 미리 추가
                >
                    <MapComponent center={center} zoom={zoom} onDragStart={onDragStart} onCenterChanged={onCenterChanged} showMyLocation={showMyLocation}>
                        {children}
                    </MapComponent>
                </Wrapper>
            </div>
        </div>
    );
}

function MapComponent({ center, zoom, children, onDragStart, onCenterChanged, showMyLocation}: { center: google.maps.LatLngLiteral, zoom: number, children?: React.ReactNode, onDragStart?: () => void, onCenterChanged?: (pos: { lat: number; lng: number }) => void, showMyLocation : boolean; }) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const myLocationMarkerRef = useRef<google.maps.Marker | null>(null);

    useEffect(() => {
        if (ref.current && !map) {
            // 지도 초기화
            const newMap = new window.google.maps.Map(ref.current, {
                center,
                zoom,
                disableDefaultUI: true, // 버튼들을 커스텀 UI(MapHomePage)로 대체하므로 기본 UI는 끔
                zoomControl: false,
                gestureHandling: 'greedy', // 모바일에서 터치감 개선
            });
            setMap(newMap);
        }
    }, [ref, map, center, zoom]);

    // 내 위치가 변할 때마다 마커 표시/업데이트
    useEffect(() => {
        if (map && center) {
            // 위치 표시를 꺼야 할 때
            if (!showMyLocation) {
                if (myLocationMarkerRef.current) {
                    myLocationMarkerRef.current.setMap(null);
                    myLocationMarkerRef.current = null;
                }
                return;
            }

            // 마커 업데이트 또는 생성
            if (myLocationMarkerRef.current) {
                myLocationMarkerRef.current.setPosition(center);
            } else {
                myLocationMarkerRef.current = new window.google.maps.Marker({
                    position: center,
                    map: map,
                    title: "내 위치",
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 2,
                    },
                });
            }
            map.panTo(center);
        }
    }, [center, map, showMyLocation]); // showMyLocation 의존성 추가

    useEffect(() => {
        if (map && onDragStart) {
            // 사용자가 지도를 드래그하기 시작('dragstart')할 때 onDragStart 실행
            const listener = map.addListener('dragstart', () => {
                onDragStart();
            });

            // 클린업: 컴포넌트가 사라지거나 리스너가 바뀌면 이벤트 제거
            return () => {
                window.google.maps.event.removeListener(listener);
            };
        }
    }, [map, onDragStart]);

    // 위치 변경 시 지도 중심 이동
    useEffect(() => {
        if (map) {
            map.panTo(center);
        }
    }, [center, map]);

    useEffect(() => {
        if (!map) return;

        // 지도의 움직임이 멈췄을 때(idle) 최종 중심 좌표를 부모에게 전달
        const idleListener = map.addListener('idle', () => {
            const newCenter = map.getCenter();
            if (newCenter && onCenterChanged) {
                onCenterChanged({
                    lat: newCenter.lat(),
                    lng: newCenter.lng()
                });
            }
        });

        return () => window.google.maps.event.removeListener(idleListener);
    }, [map, onCenterChanged]);

    return (

        <div style={{ display: 'contents' }}> {/* 또는 Fragment 사용 */}
            <div
                ref={ref} 
                style={{ width: '100%', height: '100%', minHeight: '100%' }} 
                id="map" 
            />
            {/* 구글 지도 위에 리액트 컴포넌트(마커 등)를 띄우기 위해 
                Context를 만들거나, children을 전달합니다. 
            */}
            {map && React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // child에 map 객체를 주입하여 마커가 지도를 참조할 수 있게 함
                    return React.cloneElement(child as React.ReactElement<any>, { map });
                }
            })}
        </div>
    );
}