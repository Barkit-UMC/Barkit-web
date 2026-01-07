import React from 'react';

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'tel' | 'number';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
    className?: string;
}

/**
 * [PAGE 1] 텍스트 입력창
 * 공통으로 사용되는 입력 필드 컴포넌트
 */
export default function Input({
    type = 'text',
    placeholder,
    value,
    onChange,
    label,
    error,
    className = ''
}: InputProps) {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
