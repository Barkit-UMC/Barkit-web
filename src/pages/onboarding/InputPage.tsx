// src/pages/onboarding/InputPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useOnboardingStore } from '../../store/useOnboardingStore';

/**
 * Step 3: 멤버십 번호 입력 페이지
 * - 선택된 브랜드 정보 표시
 * - 카드 번호 입력 (numeric keyboard)
 * - 로딩 후 완료 페이지로 이동
 */
export default function InputPage() {
    const navigate = useNavigate();
    const { selectedBrand, cardNumber, setCardNumber } = useOnboardingStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleComplete = () => {
        if (!cardNumber.trim()) return;

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/onboarding/complete');
        }, 1500);
    };

    // Format card number with dashes (1234-5678-9123-4567)
    const formatCardNumber = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        const groups = digits.match(/.{1,4}/g);
        return groups ? groups.join('-') : digits;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setCardNumber(rawValue);
    };

    return (
        <div className="flex-1 flex flex-col px-6 pb-8">
            {/* Title */}
            <div className="text-center mb-8">
                <h1 className="text-lg font-semibold text-gray-900">
                    멤버십 등록
                </h1>
            </div>

            {/* Selected Brand Display */}
            {selectedBrand && (
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div
                        className={`w-12 h-12 ${selectedBrand.color} rounded-xl flex items-center justify-center text-white font-bold`}
                    >
                        {selectedBrand.icon}
                    </div>
                    <span className="text-lg font-medium text-gray-900">
                        {selectedBrand.name}
                    </span>
                </div>
            )}

            {/* Card Number Input */}
            <div className="mb-8">
                <p className="text-center text-gray-600 mb-4">
                    멤버십 번호를 입력해주세요
                </p>
                <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="1234-5678-9123-4567"
                    value={formatCardNumber(cardNumber)}
                    onChange={handleCardNumberChange}
                    className="w-full py-4 px-4 bg-gray-100 rounded-xl text-center text-xl font-mono tracking-wider placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C0E8]"
                    maxLength={19} // 16 digits + 3 dashes
                />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Complete Button */}
            <button
                onClick={handleComplete}
                disabled={!cardNumber.trim() || isLoading}
                className={`w-full py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 ${cardNumber.trim() && !isLoading
                        ? 'bg-[#00C0E8] text-white hover:bg-[#00B3D8]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        등록 중...
                    </>
                ) : (
                    '완료하기'
                )}
            </button>
        </div>
    );
}
