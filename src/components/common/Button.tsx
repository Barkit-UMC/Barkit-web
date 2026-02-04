import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'cyan' | 'cyan-secondary';
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    className?: string;
}

/**
 * 공통으로 사용되는 버튼 컴포넌트
 * - primary: 00C0E8 5% 배경, 00C0E8 텍스트
 * - secondary: 00C0E8 배경, white 텍스트
 * - cyan: 온보딩용 시안 버튼
 * - cyan-secondary: 추가 보조 버튼
 */
export default function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    isLoading = false,
    loadingText,
    className = ''
}: ButtonProps) {
    const baseStyles = 'w-full py-4 text-[16px] font-medium transition-all flex items-center justify-center gap-2';

    const variantStyles = {
        primary: 'w-[345px] h-[56px] rounded-[28px] bg-[#00C0E8]/5 text-[#00C0E8] text-[16px] font-semibold hover:bg-[#00C0E8]/10',
        secondary: 'w-[345px] h-[56px] rounded-[28px] bg-[#00C0E8] text-white text-[16px] font-semibold hover:bg-[#00B0D8] active:scale-[0.98]',
        cyan: 'w-[345px] h-[56px] rounded-[28px] bg-[#00C0E8] text-white text-[16px] font-semibold hover:bg-[#00B0D8] active:scale-[0.98]',
        'cyan-secondary': 'w-[345px] h-[56px] rounded-xl bg-cyan-50 text-[#00C0E8] hover:bg-cyan-100'
    };

    const disabledStyles = 'w-[345px] h-[56px] rounded-[28px] bg-gray-300 text-[16px] text-white cursor-not-allowed';

    const currentStyles = disabled ? disabledStyles : variantStyles[variant];
    const isDisabled = disabled || isLoading;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseStyles} ${currentStyles} ${className}`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {loadingText || children}
                </>
            ) : (
                children
            )}
        </button>
    );
}