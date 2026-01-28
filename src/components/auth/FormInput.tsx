import { type ReactNode } from 'react';

interface FormInputProps {
    type?: 'text' | 'password' | 'email';
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    successMessage?: string | null;
    maxLength?: number;
    rightElement?: ReactNode;
    hasError?: boolean;
}

/**
 * 회원가입 폼 전용 입력 필드 컴포넌트
 * border-bottom 스타일의 심플한 입력창
 */
export default function FormInput({
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    successMessage,
    maxLength,
    rightElement,
    hasError = false,
}: FormInputProps) {
    const showError = hasError || !!error;

    return (
        <div className="mb-1">
            <div className="flex items-center gap-2">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    className={`flex-1 py-3 border-b text-base placeholder:text-gray-400 focus:outline-none ${showError ? 'border-[#EF4444]' : 'border-gray-200 focus:border-gray-400'
                        }`}
                />
                {rightElement}
            </div>
            <div className="h-5 mt-1 text-right">
                {error && <span className="text-sm text-red-500">{error}</span>}
                {successMessage && <span className="text-sm text-green-500">{successMessage}</span>}
            </div>
        </div>
    );
}
