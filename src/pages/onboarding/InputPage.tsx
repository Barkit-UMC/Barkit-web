// src/pages/onboarding/InputPage.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import MembershipNumberInput, {
    type MembershipNumberInputRef
} from '../../components/onboarding/MembershipNumberInput';

/**
 * Step 3: 멤버십 번호 입력 페이지
 */
export default function InputPage() {
    const navigate = useNavigate();
    const { setCardNumber } = useOnboardingStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const inputRef = useRef<MembershipNumberInputRef>(null);

    const handleCardNumberChange = (value: string) => {
        setCardNumber(value);
        setIsComplete(value.length === 16);
    };

    const handleComplete = () => {
        if (!isComplete) return;

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/onboarding/complete');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
            {/* Header */}
            <Header title="멤버십 번호 입력" showBackButton={true} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col pt-[80px] px-6 pb-24">
                <MembershipNumberInput
                    ref={inputRef}
                    onChange={handleCardNumberChange}
                    className="mt-12"
                />
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] p-6 bg-[#F5F5F5]">
                <Button
                    onClick={handleComplete}
                    disabled={!isComplete}
                    isLoading={isLoading}
                    loadingText="등록 중..."
                    variant="cyan"
                >
                    완료하기
                </Button>
            </div>
        </div>
    );
}

