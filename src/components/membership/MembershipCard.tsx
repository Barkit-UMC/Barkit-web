import Barcode from 'react-barcode';

interface MembershipCardProps {
    brandName: string;
    brandLogo?: string;
    brandColor?: string;
    membershipNumber?: string;
    onClick?: () => void;
}

export default function MembershipCard({
    brandName,
    brandLogo,
    brandColor = '#1F2937',
    membershipNumber,
    onClick
}: MembershipCardProps) {
    // 바코드용 숫자만 추출 (공백, 하이픈 제거)
    const barcodeValue = membershipNumber?.replace(/[\s-]/g, '') || '';

    return (
        <div
            className="flex flex-col cursor-pointer w-full mx-auto"
            onClick={onClick}
        >
            {/* 브랜드 헤더 */}
            <div 
                className="flex items-center justify-between px-4 h-[70px] rounded-t-[10px]"
                style={{ backgroundColor: brandColor }}
            >
                <div className="w-full h-11 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {brandLogo ? (
                            <img 
                                src={brandLogo} 
                                alt={brandName} 
                                className="w-11 h-11 rounded-lg border border-gray-200 bg-white object-contain" 
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">
                                    {brandName?.charAt(0)}
                                </span>
                            </div>
                        )}
                        <span className="text-white font-semibold text-base">{brandName}</span>
                    </div>
                </div>
            </div>

            {/* 바코드 영역 */}
            <div 
                className="bg-white h-[138px] flex items-center justify-center rounded-b-[10px] border-t border-x border-b border-gray-200"
            >
                <div className="flex items-center justify-center w-[265px] h-[122px]">
                    {barcodeValue ? (
                        <Barcode
                            value={barcodeValue}
                            width={1.5}
                            height={80}
                            fontSize={0}
                            margin={0}
                            displayValue={false}
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">바코드 없음</span>
                    )}
                </div>
            </div>
        </div>
    );
}