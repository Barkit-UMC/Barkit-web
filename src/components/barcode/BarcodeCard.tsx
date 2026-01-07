import React from 'react';

interface BarcodeCardProps {
    brandName: string;
    brandLogo?: string;
    barcodeNumber: string;
    onClick?: () => void;
}

/**
 * [PAGE 9] 메인 바코드 카드 UI
 * 홈 화면에 표시되는 바코드 카드
 */
export default function BarcodeCard({
    brandName,
    brandLogo,
    barcodeNumber,
    onClick
}: BarcodeCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center gap-4 mb-4">
                {brandLogo ? (
                    <img src={brandLogo} alt={brandName} className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">로고</span>
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-lg">{brandName}</h3>
                    <p className="text-sm text-gray-500">{barcodeNumber}</p>
                </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-2 text-xs text-gray-500">바코드를 보려면 탭하세요</div>
                    <div className="h-16 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
