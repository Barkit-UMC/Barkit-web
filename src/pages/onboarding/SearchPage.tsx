import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import MembershipSearchBar from '../../components/common/MembershipSearchBar';
import searchIcon from '../../assets/icons/search/search.svg';

// Brand icon imports (using _icon versions)
import HPointIcon from '../../assets/icons/BrandIcon/hyundai_icon.svg?react';
import KTIcon from '../../assets/icons/BrandIcon/kt_icon.svg?react';
import OliveYoungIcon from '../../assets/icons/BrandIcon/oliveyoung_icon.svg?react';
import HappyPointIcon from '../../assets/icons/BrandIcon/happypoint_icon.svg?react';

// Dummy brand data with icons (no background colors)
const BRANDS = [
    { id: 1, name: 'h point', icon: HPointIcon },
    { id: 2, name: 'KT', icon: KTIcon },
    { id: 3, name: 'LG U+', icon: OliveYoungIcon },
    { id: 4, name: 'Happy Point', icon: HappyPointIcon },
];

/**
 * 브랜드 검색/선택 페이지
 * - 클릭 시 즉시 선택 및 Register 페이지로 복귀
 */
export default function SearchPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { setBrand } = useOnboardingStore();

    // Filter brands by search query
    const filteredBrands = BRANDS.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle brand selection - select and immediately go back
    const handleBrandSelect = (brand: typeof BRANDS[0]) => {
        setBrand({
            id: brand.id,
            name: brand.name,
            icon: brand.name.charAt(0),
            color: '',
        });
        navigate('/onboarding/register');
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
                <h1 className="text-lg font-bold">멤버십 브랜드 선택</h1>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
                {/* Title */}
                <p className="text-gray-900 font-medium mb-4">
                    원하는 멤버십 브랜드를 선택해주세요
                </p>

                {/* Search Bar (공통 컴포넌트 사용) */}
                <div className="mb-6">
                    <MembershipSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="멤버십 브랜드 검색하기  ex) 스타벅스"
                        iconSearch={searchIcon}
                    />
                </div>

                {/* Brand Grid - 3 columns, 아이콘만 (배경 없음) */}
                <div className="grid grid-cols-3 gap-4 flex-1">
                    {filteredBrands.map((brand) => {
                        const IconComponent = brand.icon;
                        return (
                            <button
                                key={brand.id}
                                onClick={() => handleBrandSelect(brand)}
                                className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <IconComponent className="w-full h-full" />
                                </div>
                                <span className="text-xs text-gray-600">브랜드명</span>
                            </button>
                        );
                    })}
                    {/* Empty placeholders for grid alignment */}
                    {Array.from({ length: Math.max(0, 12 - filteredBrands.length) }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="flex flex-col items-center gap-2 p-2"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gray-100" />
                        </div>
                    ))}
                </div>

                {/* Bottom Button (disabled, for layout consistency) */}
                <div className="pt-4">
                    <button
                        disabled
                        className="w-full py-4 rounded-full bg-gray-200 text-gray-400 font-bold text-lg cursor-not-allowed"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}
