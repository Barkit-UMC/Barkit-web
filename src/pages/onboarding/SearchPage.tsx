// src/pages/onboarding/SearchPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useOnboardingStore } from '../../store/useOnboardingStore';

// Dummy brand data with unique colors
const BRANDS = [
    { id: 1, name: 'h point', icon: 'h', color: 'bg-purple-600' },
    { id: 2, name: 'KT', icon: 'kt', color: 'bg-red-500' },
    { id: 3, name: 'LG U+', icon: 'U+', color: 'bg-pink-500' },
    { id: 4, name: 'Happy Point', icon: '😊', color: 'bg-orange-400' },
    { id: 5, name: 'SKT', icon: 'T', color: 'bg-orange-500' },
    { id: 6, name: 'Starbucks', icon: '☆', color: 'bg-green-600' },
    { id: 7, name: 'CU', icon: 'CU', color: 'bg-purple-500' },
    { id: 8, name: 'GS25', icon: 'GS', color: 'bg-blue-500' },
];

/**
 * Step 2: 브랜드 검색/선택 페이지
 * - 검색창 (UI only)
 * - 브랜드 그리드
 * - 선택 시 Store에 저장
 */
export default function SearchPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedBrand, setBrand } = useOnboardingStore();

    // Filter brands by search query
    const filteredBrands = BRANDS.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBrandSelect = (brand: typeof BRANDS[0]) => {
        if (selectedBrand?.id === brand.id) {
            setBrand(null); // Deselect if already selected
        } else {
            setBrand(brand);
        }
    };

    return (
        <div className="flex-1 flex flex-col px-6 pb-8">
            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-lg font-semibold text-gray-900">
                    멤버십 브랜드 선택
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    원하는 멤버십 브랜드를 선택해주세요
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="멤버십 브랜드 검색하기 (ex. CU/SKT...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 pl-4 pr-12 bg-gray-100 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C0E8]"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-4 gap-3 flex-1">
                {filteredBrands.map((brand) => (
                    <button
                        key={brand.id}
                        onClick={() => handleBrandSelect(brand)}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${selectedBrand?.id === brand.id
                            ? 'ring-2 ring-[#00C0E8] ring-offset-2'
                            : ''
                            }`}
                    >
                        <div
                            className={`w-12 h-12 ${brand.color} rounded-xl flex items-center justify-center text-white font-bold text-sm mb-1`}
                        >
                            {brand.icon}
                        </div>
                        <span className="text-xs text-gray-600 truncate w-full text-center">
                            {brand.name}
                        </span>
                    </button>
                ))}
                {/* Empty placeholders for grid alignment */}
                {Array.from({ length: Math.max(0, 8 - filteredBrands.length) }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200"
                    />
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => navigate('/onboarding/input')}
                disabled={!selectedBrand}
                className={`w-full py-4 rounded-full font-bold text-lg transition-colors mt-6 ${selectedBrand
                    ? 'bg-[#00C0E8] text-white hover:bg-[#00B3D8]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                다음
            </button>
        </div>
    );
}
