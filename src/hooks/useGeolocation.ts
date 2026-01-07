import { useState, useEffect } from 'react';

interface GeolocationPosition {
    lat: number;
    lng: number;
}

/**
 * 내 위치(GPS) 가져오는 로직을 관리하는 커스텀 훅
 */
export function useGeolocation() {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getCurrentPosition = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('위치 서비스를 지원하지 않는 브라우저입니다.');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setLoading(false);
            },
            (err) => {
                setError('위치 정보를 가져올 수 없습니다.');
                console.error('Geolocation error:', err);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);

    return {
        position,
        error,
        loading,
        refetch: getCurrentPosition
    };
}
