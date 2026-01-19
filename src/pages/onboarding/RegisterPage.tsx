import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useOnboardingStore } from '../../store/useOnboardingStore';

// Brand icon imports (using _icon versions)
import HPointIcon from '../../assets/icons/BrandIcon/hyundai_icon.svg?react';
import KTIcon from '../../assets/icons/BrandIcon/kt_icon.svg?react';
import OliveYoungIcon from '../../assets/icons/BrandIcon/oliveyoung_icon.svg?react';
import HappyPointIcon from '../../assets/icons/BrandIcon/happypoint_icon.svg?react';

// Brand icon mapping for display
const BRAND_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'h point': HPointIcon,
    'KT': KTIcon,
    'LG U+': OliveYoungIcon,
    'Happy Point': HappyPointIcon,
};

/**
 * 멤버십 등록 허브 페이지
 * - 브랜드 선택, 번호 입력, 바코드 추가 섹션
 * - 브랜드 미선택 시 번호 입력/바코드 섹션 비활성화
 */
export default function RegisterPage() {
    const navigate = useNavigate();
    const { selectedBrand, cardNumber } = useOnboardingStore();

    // 브랜드 선택 여부
    const isBrandSelected = !!selectedBrand;

    // Format card number for display (mask middle digits)
    const formatDisplayNumber = (num: string) => {
        if (!num) return '';
        const padded = num.padEnd(16, '0');
        return `${padded.slice(0, 4)}-****-****-${padded.slice(12, 16)}`;
    };

    return (
        <div className="w-[390px] min-h-screen mx-auto bg-white flex flex-col">
            {/* Header */}
            <header className="relative flex items-center justify-center h-14 bg-white border-b border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="뒤로가기"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">멤버십 등록</h1>
            </header>

            {/* Content */}
            <div className="flex-1 px-6 py-6 space-y-8 overflow-y-auto">
                {/* Section A: 멤버십 브랜드 선택 */}
                <section>
                    <h2 className="font-bold text-gray-900 mb-3">멤버십 브랜드 선택</h2>

                    {/* Brand Icon Preview Row - 아이콘만, 배경 없음 */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 flex items-center justify-center">
                            <HPointIcon className="w-full h-full" />
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center">
                            <KTIcon className="w-full h-full" />
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center">
                            <OliveYoungIcon className="w-full h-full" />
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center">
                            <HappyPointIcon className="w-full h-full" />
                        </div>
                    </div>

                    {selectedBrand ? (
                        <button
                            onClick={() => navigate('/onboarding/search')}
                            className="w-full py-4 rounded-xl bg-[#00C0E8] text-white font-medium flex items-center justify-center gap-3"
                        >
                            {BRAND_ICONS[selectedBrand.name] && (
                                <div className="w-8 h-8 flex items-center justify-center">
                                    {(() => {
                                        const IconComponent = BRAND_ICONS[selectedBrand.name];
                                        return IconComponent ? <IconComponent className="w-full h-full" /> : null;
                                    })()}
                                </div>
                            )}
                            <span>{selectedBrand.name} 선택됨 (변경하기)</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/onboarding/search')}
                            className="w-full py-4 rounded-xl bg-cyan-50 text-[#00C0E8] font-medium hover:bg-cyan-100 transition-colors"
                        >
                            선택하기
                        </button>
                    )}
                </section>

                {/* Section B: 멤버십 번호 입력 */}
                <section className={!isBrandSelected ? 'opacity-50' : ''}>
                    <h2 className="font-bold text-gray-900 mb-1">멤버십 번호 입력</h2>
                    {!isBrandSelected && (
                        <p className="text-xs text-gray-400 mb-3">먼저 브랜드를 선택해주세요</p>
                    )}

                    {/* Number Preview */}
                    <div className="flex items-center gap-2 mb-4">
                        {['1234', '5678', '9123', '8284'].map((segment, idx) => (
                            <div
                                key={idx}
                                className="flex-1 py-3 px-2 rounded-full border border-gray-200 text-center text-gray-400 text-sm"
                            >
                                {cardNumber ? (idx === 0 || idx === 3 ? cardNumber.slice(idx * 4, idx * 4 + 4) || segment : '****') : segment}
                            </div>
                        ))}
                    </div>

                    {cardNumber ? (
                        <button
                            onClick={() => isBrandSelected && navigate('/onboarding/input')}
                            disabled={!isBrandSelected}
                            className={`w-full py-4 rounded-xl font-medium ${isBrandSelected
                                    ? 'bg-[#00C0E8] text-white'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {formatDisplayNumber(cardNumber)} (수정하기)
                        </button>
                    ) : (
                        <button
                            onClick={() => isBrandSelected && navigate('/onboarding/input')}
                            disabled={!isBrandSelected}
                            className={`w-full py-4 rounded-xl font-medium transition-colors ${isBrandSelected
                                    ? 'bg-cyan-50 text-[#00C0E8] hover:bg-cyan-100'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            입력하기
                        </button>
                    )}
                </section>

                {/* Section C: 사진으로 바코드 추가 */}
                <section className={!isBrandSelected ? 'opacity-50' : ''}>
                    <h2 className="font-bold text-gray-900 mb-1">사진으로 바코드 추가</h2>
                    {!isBrandSelected && (
                        <p className="text-xs text-gray-400 mb-3">먼저 브랜드를 선택해주세요</p>
                    )}
                    <button
                        onClick={() => isBrandSelected && alert('준비 중인 기능입니다.')}
                        disabled={!isBrandSelected}
                        className={`w-full py-4 rounded-xl font-medium transition-colors ${isBrandSelected
                                ? 'bg-cyan-50 text-[#00C0E8] hover:bg-cyan-100'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        추가하기
                    </button>
                </section>
            </div>
        </div>
    );
}
