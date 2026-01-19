interface SocialLoginBtnProps {
    provider: 'kakao' | 'naver';
    onClick: () => void;
}

/**
 * [PAGE 2] 카카오/네이버 로그인 버튼
 * 소셜 로그인 버튼 컴포넌트 - 원형 아이콘 버튼
 */
export default function SocialLoginBtn({ provider, onClick }: SocialLoginBtnProps) {
    const config = {
        kakao: {
            bg: 'bg-[#FEE500]',
            logoSrc: '/kakaotalk-logo.svg',
            alt: '카카오톡 로그인'
        },
        naver: {
            bg: 'bg-[#03C75A]',
            logoSrc: '/naver-logo.svg',
            alt: '네이버 로그인'
        }
    };

    const { bg, logoSrc, alt } = config[provider];

    return (
        <button
            onClick={onClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${bg} transition-transform hover:scale-110 shadow-md`}
            aria-label={alt}
        >
            <img src={logoSrc} alt={alt} className="w-10 h-10" />
        </button>
    );
}
