import { useRef, useState } from "react";
import Button from "../../../components/common/Button";
import Header from "../../../components/common/Header";
import MembershipNumberInput, { type MembershipNumberInputRef } from "../../../components/onboarding/MembershipNumberInput";
import { useNavigate, useParams } from "react-router-dom";

export default function InputNumberPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const inputRef = useRef<MembershipNumberInputRef>(null);

    const handleCardNumberChange = (value: string) => {
        setIsComplete(value.length === 16);
    };

    const handleComplete = () => {
        if (!isComplete || !id) return;

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            
            // TODO: API 연결 시 성공/실패 처리
            const isSuccess = true; // 임시로 성공으로 설정
            
            if (isSuccess) {
                navigate(`/membership/${id}/change/complete`);
            } else {
                // 실패 시 changeMethod 전달
                navigate(`/membership/${id}/change/failure`, {
                    state: { changeMethod: 'number' }
                });
            }
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
                    loadingText="변경 중..."
                    variant="cyan"
                >
                    완료하기
                </Button>
            </div>
        </div>
    );
}