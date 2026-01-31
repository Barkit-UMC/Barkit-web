import React from 'react';

interface BarcodeCardProps {
    brandName: string;
    brandLogo?: string;
    barcodeNumber: string;
    onClick?: () => void;
}

/**
 * [PAGE 9] 상세 페이지용 바코드 카드 UI
 * 상단 브랜드 바와 하단 바코드 영역이 분리된 디자인
 */
export default function MembershipCard({
    brandName,
    brandLogo,
    barcodeNumber,
    onClick
}: BarcodeCardProps) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
        >
            {/* 1. 카드 상단 헤더 (어두운 배경) */}
            <div className="bg-[#2D161B] px-4 py-3.5 flex items-center gap-3">
                {brandLogo ? (
                    <img 
                        src={brandLogo} 
                        alt={brandName} 
                        className="w-7 h-7 rounded-full object-cover border border-white/20" 
                    />
                ) : (
                    /* 로고가 없을 때 보여줄 기본 그라디언트 아이콘 */
                    <div className="w-7 h-7 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full" />
                )}
                <span className="text-white text-[15px] tracking-tight">
                    {brandName}
                </span>
            </div>

            {/* 2. 카드 하단 (흰색 바코드 영역) */}
            <div className="bg-white px-6 py-8 flex flex-col items-center justify-center">
                {/* 바코드 이미지 영역 */}
                <div className="w-full max-w-[280px] h-24 flex flex-col items-center">
                    {/* 실제 구현시에는 여기에 Barcode 라이브러리를 넣으세요 */}
                    <div className="w-full h-20 bg-[url('/barcode-sample.png')] bg-contain bg-no-repeat bg-center" />
                </div>
            </div>
        </div>
    );
}