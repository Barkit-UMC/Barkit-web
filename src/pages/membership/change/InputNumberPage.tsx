import { useRef, useState } from "react";
import Button from "../../../components/common/Button";
import Header from "../../../components/common/Header";
import MembershipNumberInput, { type MembershipNumberInputRef } from "../../../components/onboarding/MembershipNumberInput";
import { useNavigate, useParams } from "react-router-dom";
import { membershipApi } from "../../../api/membership";
import Layout from "../../../components/common/Layout";

export default function InputNumberPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<MembershipNumberInputRef>(null);

    const handleCardNumberChange = (value: string) => {
        setIsComplete(value.length === 16);
        setError(null);
    };

    const handleComplete = async () => {
        if (!isComplete || !id) return;

        const membershipNumber = inputRef.current?.getValue() || '';
        if (!membershipNumber) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await membershipApi.updateMembershipNumber(
                Number(id),
                membershipNumber
            );

            if (response.isSuccess) {
                navigate(`/membership/${id}/change/complete`);
            } else {
                setError(response.message || '멤버십 번호 변경에 실패했습니다.');
            }
        } catch (err) {
            console.error('Update membership number error:', err);
            navigate(`/membership/${id}/change/failure`, {
                state: { changeMethod: 'number' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout showBottomNav={false}>
            {/* Header */}
            <Header title="멤버십 번호 입력" showBackButton={true} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col pt-[80px] px-6 pb-24">
                <MembershipNumberInput
                    ref={inputRef}
                    onChange={handleCardNumberChange}
                    className="mt-12"
                />

                {/* 에러 메시지 */}
                {error && (
                    <div className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}
            </div>

            {/* Fixed Bottom Button */}
            <div className="px-6 pb-8">
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
        </Layout>
    );
}