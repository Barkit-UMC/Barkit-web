import React from 'react';

interface BarcodeCardProps {
    brandName: string;
    brandLogo?: string;
    points?: number | null;
    color: string;
    barcodeNumber?: string;
    onClick?: () => void;
}

export default function BarcodeCard({
    brandName,
    brandLogo,
    points,
    color,
    onClick
}: BarcodeCardProps) {
    return (
        <div
            onClick={onClick}
            className={`${color} rounded-2xl p-5 cursor-pointer shadow-md hover:shadow-lg transition-all relative overflow-hidden h-full`}
        >
            {/* 우측 상단 로고 영역 */}
            <div className="absolute top-5 right-5 w-8 h-8 bg-white/90 rounded-lg overflow-hidden">
                {brandLogo ? (
                    <img src={brandLogo} alt="" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
            </div>

            {/* 좌측 상단 포인트 */}
            <div className="absolute top-5 left-5">
                <p className="text-white text-2xl font-bold">{points?.toLocaleString()}P</p>
            </div>

            {/* 좌측 하단 브랜드명 */}
            <div className="absolute bottom-8 left-5">
                <h3 className="text-white text-xl font-bold">
                    {brandName}
                </h3>
            </div>
        </div>
    );
}