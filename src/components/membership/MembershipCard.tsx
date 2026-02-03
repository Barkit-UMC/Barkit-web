interface MembershipCardProps {
    brandName: string;
    brandLogo?: string;
    brandColor?: string;
    onClick?: () => void;
}

export default function MembershipCard({
    brandName,
    brandLogo,
    brandColor = '#1F2937', // 기본값: gray-900
    onClick
}: MembershipCardProps) {
    return (
        <div 
            className="flex flex-col cursor-pointer rounded-[10px] overflow-hidden"
            style={{ backgroundColor: brandColor }}
            onClick={onClick}
        >
            {/* 브랜드 헤더 */}
            <div className="flex items-center justify-between px-4 h-[70px]">
                <div className="w-[319px] h-11 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {brandLogo ? (
                            <img src={brandLogo} alt={brandName} className="w-11 h-11 rounded-lg border border-gray-400" />
                        ) : (
                            <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">
                                    {brandName.charAt(0)}
                                </span>
                            </div>
                        )}
                        <span className="text-white font-semibold text-base">{brandName}</span>
                    </div>
                </div>
            </div>

            {/* 바코드 영역 */}
            <div 
                className="bg-white h-[138px] flex flex-col items-center justify-center border border-gray-200"
            >
                {/* 바코드 이미지 */}
                <div 
                    className="bg-white flex items-center justify-center mb-2 w-[265px] h-[122px]"
                >
                    <svg 
                        className="w-full h-full" 
                        viewBox="0 0 300 100" 
                        preserveAspectRatio="none"
                    >
                        {/* 간단한 바코드 시뮬레이션 */}
                        {Array.from({ length: 50 }, (_, i) => (
                            <rect
                                key={i}
                                x={i * 6}
                                y="10"
                                width={Math.random() > 0.5 ? 3 : 2}
                                height="80"
                                fill="black"
                            />
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}