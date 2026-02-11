import { useEffect, useState } from 'react';
import markerIcon from '../../assets/icons/map/marker.svg';

interface MapMarkerProps {
    position: { lat: number; lng: number };
    title?: string;
    map?: google.maps.Map; // MapContainer에서 주입받음
}

export default function MapMarker({ position, title, map }: MapMarkerProps) {
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);

    useEffect(() => {
        if (!map) return;

        // 이미 마커가 있다면 위치만 업데이트하고 새로 만들지 않음
        if (marker) {
            marker.setPosition(position);
            return;
        }

        // 마커 생성
        const newMarker = new window.google.maps.Marker({
            position,
            map,
            title,
            icon: {
                url: markerIcon, // 이미지 경로
                scaledSize: new window.google.maps.Size(40, 40), // 3. 이미지 크기 조절 (가로, 세로)
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 40), // 4. 마커가 찍힐 지점 (가로 중앙, 세로 하단)
            },
            animation: window.google.maps.Animation.DROP,
        });

        setMarker(newMarker);

        // 클린업: 컴포넌트 언마운트 시 마커 제거
        return () => {
            if (newMarker) {
                newMarker.setMap(null);
            }
        };
    }, [map]); // map이 로드된 후 한 번만 실행

    useEffect(() => {
        // 위치가 바뀌면 마커 위치 업데이트
        if (marker) {
            marker.setPosition(position);
        }
    }, [position, marker]);

    return null; // 실제 DOM 요소는 렌더링하지 않음
}