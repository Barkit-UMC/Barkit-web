import React from 'react';

interface SocialLoginBtnProps {
    provider: 'kakao' | 'naver';
    onClick: () => void;
}

/**
 * [PAGE 2] 카카오/네이버 로그인 버튼
 * 소셜 로그인 버튼 컴포넌트
 */
export default function SocialLoginBtn({ provider, onClick }: SocialLoginBtnProps) {
    const config = {
        kakao: {
            bg: 'bg-[#FEE500]',
            text: 'text-[#000000]',
            label: '카카오로 시작하기',
            icon: '💬'
        },
        naver: {
            bg: 'bg-[#03C75A]',
            text: 'text-white',
            label: '네이버로 시작하기',
            icon: 'N'
        }
    };

    const { bg, text, label, icon } = config[provider];

    return (
        <button
            onClick={onClick}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${bg} ${text} transition-opacity hover:opacity-90`}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
