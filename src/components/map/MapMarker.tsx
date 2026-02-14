import { useEffect, useRef } from 'react';
import markerIcon from '../../assets/icons/map/marker.svg';

interface MapMarkerProps {
    position: { lat: number; lng: number };
    title?: string;
    map?: google.maps.Map;
    onClick?: () => void;
}

export default function MapMarker({ position, title, map, onClick }: MapMarkerProps) {
    const markerRef = useRef<google.maps.Marker | null>(null);

    useEffect(() => {
        if (!map || !position) return;

        if (!markerRef.current) {
            // 1. 마커가 없으면 새로 생성
            markerRef.current = new window.google.maps.Marker({
                position,
                map,
                title,
                icon: {
                    url: markerIcon,
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 40),
                },
                animation: window.google.maps.Animation.DROP,
            });
        } else {
            // 2. 마커가 이미 있다면 위치와 지도 참조만 갱신 (모바일 최적화)
            markerRef.current.setMap(map);
            markerRef.current.setPosition(position);
        }

        // 3. 클릭 이벤트 리스너 처리
        if (onClick) {
            const listener = markerRef.current.addListener("click", onClick);
            return () => {
                window.google.maps.event.removeListener(listener);
            };
        }
    }, [map, position, onClick]); // onClick도 의존성에 추가하여 최신 핸들러 유지

    // 4. 컴포넌트 언마운트 시 마커 제거 (필수)
    useEffect(() => {
        return () => {
            if (markerRef.current) {
                markerRef.current.setMap(null);
                markerRef.current = null;
            }
        };
    }, []);

    return null;
}