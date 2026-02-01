// src/pages/onboarding/InputPage.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

/**
 * Step 3: 멤버십 번호 입력 페이지
 * - 4개의 개별 입력 박스로 16자리 멤버십 번호 입력
 * - 자동 포커스 이동 (4자리 입력 완료 시 다음 박스로)
 * - Backspace 시 이전 박스로 이동
 * - 붙여넣기 지원
 */
export default function InputPage() {
    const navigate = useNavigate();
    const { setCardNumber } = useOnboardingStore();
    const [isLoading, setIsLoading] = useState(false);

    // 4개의 입력 값 상태
    const [values, setValues] = useState<string[]>(['', '', '', '']);

    // 입력 필드 refs
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // 전체 카드번호 계산
    const fullCardNumber = values.join('');
    const isComplete = fullCardNumber.length === 16;

    // 전역 스토어 업데이트
    useEffect(() => {
        setCardNumber(fullCardNumber);
    }, [fullCardNumber, setCardNumber]);

    const handleChange = (index: number, value: string) => {
        // 숫자만 허용
        const digits = value.replace(/\D/g, '').slice(0, 4);

        const newValues = [...values];
        newValues[index] = digits;
        setValues(newValues);

        // 4자리 입력 완료 시 다음 입력으로 자동 포커스
        if (digits.length === 4 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Backspace 처리: 현재 입력이 비어있고 Backspace 누르면 이전 입력으로 이동
        if (e.key === 'Backspace' && values[index] === '' && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 16);

        if (pastedData.length > 0) {
            const newValues = ['', '', '', ''];
            for (let i = 0; i < 4; i++) {
                newValues[i] = pastedData.slice(i * 4, (i + 1) * 4);
            }
            setValues(newValues);

            // 마지막 입력된 박스로 포커스 이동
            const lastFilledIndex = Math.min(Math.floor((pastedData.length - 1) / 4), 3);
            inputRefs.current[lastFilledIndex]?.focus();
        }
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
                {/* Input Boxes Container */}
                <div className="bg-white rounded-2xl p-6 mt-4 shadow-sm">
                    <div className="flex justify-center gap-3">
                        {values.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="tel"
                                inputMode="numeric"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                placeholder="0000"
                                maxLength={4}
                                className="w-[72px] h-11 bg-[#F4F4F4] border-0 rounded-lg text-center text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            />
                        ))}
                    </div>
                </div>
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
