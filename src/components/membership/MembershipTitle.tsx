interface MembershipTitleProps {
    brandName: string;
    brandLogo: string;
    brandColor?: string;
    onClick?: () => void;
}

/**
 * 멤버십 그리드 카드 컴포넌트
 * 2열 그리드로 표시되는 작은 멤버십 카드
 */
export default function MembershipGridCard({
    brandName,
    brandLogo,
    brandColor = '#374151',
    onClick
}: MembershipTitleProps) {
    return (
        <button
            onClick={onClick}
            className="relative aspect-[16/10] w-[165px] h-[91px] rounded-[10px] overflow-hidden cursor-pointer"
            style={{ backgroundColor: brandColor }}
        >
            {/* 브랜드 로고 배경 */}
            <img 
                src={brandLogo} 
                alt={brandName}
                className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            
            {/* 오버레이 + 브랜드명 */}
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4">
                <h3 className="text-gray-50 font-semibold text-xl text-center drop-shadow-lg">
                    {brandName}
                </h3>
            </div>
        </button>
    );
}