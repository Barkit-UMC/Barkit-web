import { useEffect, useRef } from 'react';
import markerIcon from '../../assets/icons/map/marker.svg';

interface MapMarkerProps {
    position: { lat: number; lng: number };
    title?: string;
    map?: google.maps.Map;
}

export default function MapMarker({ position, title, map }: MapMarkerProps) {
    // 1. useState 대신 useRef를 사용합니다.
    const markerRef = useRef<google.maps.Marker | null>(null);

    useEffect(() => {
        if (!map) return;

        // 2. 마커가 아직 생성되지 않았을 때만 새로 만듭니다.
        if (!markerRef.current) {
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
        }

        // 클린업: 마커 제거
        return () => {
            if (markerRef.current) {
                markerRef.current.setMap(null);
                markerRef.current = null;
            }
        };
    }, [map]); // map 객체가 준비되면 한 번 실행

    useEffect(() => {
        // 3. 좌표(position)가 바뀔 때만 마커의 위치를 업데이트합니다.
        if (markerRef.current) {
            markerRef.current.setPosition(position);
        }
    }, [position]);

    return null; // 화면에 그릴 것은 없습니다.
}