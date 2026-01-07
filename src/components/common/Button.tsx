import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    className?: string;
}

/**
 * [PAGE 1] 파란색 완료 버튼
 * 공통으로 사용되는 버튼 컴포넌트
 */
export default function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = ''
}: ButtonProps) {
    const baseStyles = 'w-full py-4 rounded-lg font-semibold transition-colors';
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
