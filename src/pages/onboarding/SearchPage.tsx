import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import searchIcon from '../../assets/icons/search/search_main.svg';

// Brand icon imports
import CJOneIcon from '../../assets/icons/BrandIcon/cjone_icon.svg?react';
import KTIcon from '../../assets/icons/BrandIcon/kt_icon.svg?react';
import SKTIcon from '../../assets/icons/BrandIcon/skt_icon.svg?react';
import UplusIcon from '../../assets/icons/BrandIcon/uplus_icon.svg?react';
import SSGIcon from '../../assets/icons/BrandIcon/SSG.svg?react';
import LpointIcon from '../../assets/icons/BrandIcon/Lpoint.svg?react';
import OKcashIcon from '../../assets/icons/BrandIcon/OKcash.svg?react';
import HappyPointIcon from '../../assets/icons/BrandIcon/HappyPoint.svg?react';
import NaverIcon from '../../assets/icons/BrandIcon/Naver.svg?react';
import KakaopayIcon from '../../assets/icons/BrandIcon/kakaopay.svg?react';

// Brand data type
interface Brand {
    id: number;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// Brand list with icons (IDs match backend membershipBrandId)
const BRANDS: Brand[] = [
    { id: 1, name: 'CJ ONE', icon: CJOneIcon },
    { id: 3, name: 'KT', icon: KTIcon },
    { id: 5, name: 'SKT', icon: SKTIcon },
    { id: 6, name: 'LG U+', icon: UplusIcon },
    { id: 7, name: '신세계 SSG', icon: SSGIcon },
    { id: 4, name: 'L.POINT', icon: LpointIcon },
    { id: 8, name: 'OK캐쉬백', icon: OKcashIcon },
    { id: 2, name: '해피포인트', icon: HappyPointIcon },
    { id: 9, name: '네이버', icon: NaverIcon },
    { id: 10, name: '카카오페이', icon: KakaopayIcon },
];

// ============================================
// BrandItem Component
// ============================================
interface BrandItemProps {
    brand: Brand;
    isSelected: boolean;
    hasSelection: boolean;
    onSelect: (brand: Brand) => void;
}

function BrandItem({ brand, isSelected, hasSelection, onSelect }: BrandItemProps) {
    const IconComponent = brand.icon;

    // Determine opacity: if no selection, full opacity; if selected, full; otherwise dimmed
    const opacity = !hasSelection ? 1 : isSelected ? 1 : 0.3;

    return (
        <button
            onClick={() => onSelect(brand)}
            className="flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-200"
            style={{ opacity }}
        >
            <div className="w-21 h-21 flex items-center justify-center rounded-2xl overflow-hidden">
                <IconComponent className="w-full h-full" />
            </div>
            <span className="text-medium font-semibold text-center leading-tight">
                {brand.name}
            </span>
        </button>
    );
}

// ============================================
// BrandGrid Component
// ============================================
interface BrandGridProps {
    brands: Brand[];
    selectedBrandId: number | null;
    onSelectBrand: (brand: Brand) => void;
}

function BrandGrid({ brands, selectedBrandId, onSelectBrand }: BrandGridProps) {
    const hasSelection = selectedBrandId !== null;

    return (
        <div className="grid grid-cols-3 gap-y-8 gap-x-8">
            {brands.map((brand) => (
                <BrandItem
                    key={brand.id}
                    brand={brand}
                    isSelected={selectedBrandId === brand.id}
                    hasSelection={hasSelection}
                    onSelect={onSelectBrand}
                />
            ))}
        </div>
    );
}

// ============================================
// SearchPage Main Component
// ============================================
export default function SearchPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    // Animate progress on mount
    useEffect(() => {
        const timer = setTimeout(() => setProgress(50), 100);
        return () => clearTimeout(timer);
    }, []);

    const { setBrand } = useOnboardingStore();

    // Filter brands by search query
    const filteredBrands = useMemo(() => {
        if (!searchQuery.trim()) return BRANDS;
        return BRANDS.filter((brand) =>
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Handle brand selection (single select)
    const handleSelectBrand = (brand: Brand) => {
        setSelectedBrandId(brand.id === selectedBrandId ? null : brand.id);
    };

    // Handle next button click
    const handleNext = () => {
        const selectedBrand = BRANDS.find((b) => b.id === selectedBrandId);
        if (selectedBrand) {
            setBrand({
                id: selectedBrand.id,
                name: selectedBrand.name,
                icon: selectedBrand.name.charAt(0),
                color: '#00C7E2',
            });
            navigate('/onboarding/select-method');
        }
    };

    const isButtonActive = selectedBrandId !== null;

    return (
        <div className="flex h-screen mx-auto bg-white flex flex-col relative">
            {/* Header - 공통 컴포넌트 활용 */}
            <Header title="멤버십 브랜드 등록" showBackButton />

            {/* Progress Bar */}
            <div className="fixed top-[60px] left-0 right-0 h-2 bg-gray-100 z-30">
                <div
                    className="h-full bg-[#00C0E8] transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Content - Header 높이만큼 padding-top */}
            <main className="flex-1 flex flex-col pt-[76px] overflow-hidden">
                {/* Title & Search Section - 고정 */}
                <div className="px-6 pt-4 pb-2 flex-shrink-0 bg-white">
                    <p className="text-lg text-gray-900 font-bold mb-4">
                        원하는 멤버십 브랜드를 선택해주세요
                    </p>

                    {/* Search Input - Flexbox with always-visible cyan border */}
                    <div className="flex items-stretch mb-6 border-[1px] border-[#00C7E2] rounded-xl overflow-hidden bg-gray-50">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="원하시는 브랜드를 검색해주세요"
                            className="flex-1 h-12 px-4 bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
                        />
                        <button
                            className="w-16 h-12 flex items-center justify-center bg-[#00C7E2] flex-shrink-0"
                        >
                            <img src={searchIcon} alt="검색" className="w-5 h-5 brightness-0 invert" />
                        </button>
                    </div>
                </div>

                {/* Brand Grid - 스크롤 가능 영역, 버튼 높이만큼 padding-bottom */}
                <div className="flex-1 px-6 pb-[100px] overflow-y-auto">
                    <BrandGrid
                        brands={filteredBrands}
                        selectedBrandId={selectedBrandId}
                        onSelectBrand={handleSelectBrand}
                    />
                </div>
            </main>

            {/* Bottom Button - 하단 고정 */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <Button
                    onClick={handleNext}
                    disabled={!isButtonActive}
                    variant="cyan"
                >
                    다음
                </Button>
            </div>
        </div>
    );
}
