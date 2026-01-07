import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title?: string;
    showBackButton?: boolean;
    rightAction?: React.ReactNode;
}

/**
 * [PAGE 4] 뒤로가기 있는 헤더
 * 공통 헤더 컴포넌트
 */
export default function Header({
    title,
    showBackButton = true,
    rightAction
}: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    {showBackButton && (
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="뒤로가기"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {title && (
                        <h1 className="text-lg font-semibold">{title}</h1>
                    )}
                </div>
                {rightAction && (
                    <div>{rightAction}</div>
                )}
            </div>
        </header>
    );
}
