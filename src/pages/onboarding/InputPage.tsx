// src/pages/onboarding/InputPage.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { useMembershipRegister } from '../../hooks/useMembershipRegister';
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
    const { selectedBrand, setCardNumber } = useOnboardingStore();
    const [isComplete, setIsComplete] = useState(false);
    const inputRef = useRef<MembershipNumberInputRef>(null);
    const [membershipNumber, setMembershipNumber] = useState('');

    // 멤버십 등록 훅 — 성공/실패 시 각각 다른 페이지로 이동
    const { register, isLoading, error } = useMembershipRegister({
        onSuccess: () => navigate('/onboarding/complete'),
        onError: () => navigate('/onboarding/failure'),
    });

    const handleCardNumberChange = (value: string) => {
        setCardNumber(value);
        setMembershipNumber(value);
        setIsComplete(value.length === 16);
    };

    const handleComplete = async () => {
        if (!isComplete || !selectedBrand) return;

        // 실제 API 호출
        await register(selectedBrand.id, membershipNumber);
    };

    return (
        <div className="h-full mx-auto bg-[#F5F5F5] flex flex-col relative">
            {/* Header */}
            <Header title="멤버십 번호 입력" showBackButton={true} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col pt-[80px] px-6 pb-24">
                {/* 에러 메시지 */}
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                        {error}
                    </div>
                )}

                <MembershipNumberInput
                    ref={inputRef}
                    onChange={handleCardNumberChange}
                    className="mt-12"
                />
            </div>

            {/* Fixed Bottom Button */}
            <div className="px-6 pb-8">
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