// src/components/onboarding/MembershipNumberInput.tsx
import { useState, useRef, useImperativeHandle, forwardRef } from 'react';

interface MembershipNumberInputProps {
    onChange?: (value: string) => void;
    className?: string;
}

export interface MembershipNumberInputRef {
    getValue: () => string;
    isComplete: () => boolean;
    reset: () => void;
}

/**
 * 멤버십 번호 입력 컴포넌트
 * - 4개의 개별 입력 박스로 16자리 멤버십 번호 입력
 * - 자동 포커스 이동 (4자리 입력 완료 시 다음 박스로)
 * - Backspace 시 이전 박스로 이동
 * - 붙여넣기 지원
 */
const MembershipNumberInput = forwardRef<MembershipNumberInputRef, MembershipNumberInputProps>(
    ({ onChange, className = '' }, ref) => {
        const [values, setValues] = useState<string[]>(['', '', '', '']);
        const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

        // 외부에서 접근 가능한 메서드 노출
        useImperativeHandle(ref, () => ({
            getValue: () => values.join(''),
            isComplete: () => values.join('').length === 16,
            reset: () => setValues(['', '', '', '']),
        }));

        const handleChange = (index: number, value: string) => {
            const digits = value.replace(/\D/g, '').slice(0, 4);

            const newValues = [...values];
            newValues[index] = digits;
            setValues(newValues);

            // 부모 컴포넌트에 변경 알림
            onChange?.(newValues.join(''));

            // 4자리 입력 완료 시 다음 입력으로 자동 포커스
            if (digits.length === 4 && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        };

        const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
                onChange?.(newValues.join(''));

                const lastFilledIndex = Math.min(Math.floor((pastedData.length - 1) / 4), 3);
                inputRefs.current[lastFilledIndex]?.focus();
            }
        };

        return (
            <div className={`bg-white rounded-xl p-10 ${className}`}>
                <div className="flex justify-center gap-4">
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
                            className="flex-1 min-w-0 h-8 bg-[#F4F4F4] border-0 rounded-lg text-center text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        />
                    ))}
                </div>
            </div>
        );
    }
);

MembershipNumberInput.displayName = 'MembershipNumberInput';

export default MembershipNumberInput;
