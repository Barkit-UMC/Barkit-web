import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'cyan';
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    className?: string;
}

/**
 * 공통으로 사용되는 버튼 컴포넌트
 * - primary: 파란색 기본 버튼 (rounded-lg)
 * - secondary: 회색 보조 버튼 (rounded-lg)
 * - cyan: 온보딩용 시안 버튼 (rounded-full)
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
    const baseStyles = 'w-full py-4 font-semibold transition-all flex items-center justify-center gap-2';

    const variantStyles = {
        primary: 'rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed',
        secondary: 'rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300',
        cyan: 'rounded-full bg-[#00C0E8] text-white hover:bg-[#00B0D8] shadow-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]'
    };

    const isDisabled = disabled || isLoading;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
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
