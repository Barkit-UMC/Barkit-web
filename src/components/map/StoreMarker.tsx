import React from 'react';

interface StoreMarkerProps {
    storeName: string;
    address: string;
    distance?: number;
    onClick?: () => void;
}

/**
 * [PAGE 18] 지도 위 마커 핀
 * 매장 위치를 표시하는 마커 컴포넌트
 */
export default function StoreMarker({
    storeName,
    address,
    distance,
    onClick
}: StoreMarkerProps) {
    return (
        <div
            onClick={onClick}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
        >
            {/* 마커 핀 */}
            <div className="relative">
                <svg className="w-10 h-10 text-blue-600 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>

                {/* 매장 정보 툴팁 */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] whitespace-nowrap">
                    <div className="font-semibold text-sm">{storeName}</div>
                    <div className="text-xs text-gray-500 mt-1">{address}</div>
                    {distance !== undefined && (
                        <div className="text-xs text-blue-600 mt-1">{distance}m</div>
                    )}
                    {/* 말풍선 꼬리 */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
