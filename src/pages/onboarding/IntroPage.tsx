import { useNavigate } from 'react-router-dom';
import BarkitIcon from '../../assets/icons/Barkit_icon_default.svg?react';
import HyundaiIcon from '../../assets/icons/BrandIcon/hyundai_icon.svg?react';
import OliveYoungIcon from '../../assets/icons/BrandIcon/oliveyoung_icon.svg?react';
import HappyPointIcon from '../../assets/icons/BrandIcon/happypoint_icon.svg?react';
import KTIcon from '../../assets/icons/BrandIcon/kt_icon.svg?react';

export default function IntroPage() {
    const navigate = useNavigate();

    return (
        <div className="w-[390px] min-h-screen mx-auto bg-white flex flex-col">
            {/* 0. 애니메이션 스타일 주입 */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>

            {/* Content */}
            <main className="flex-1 flex flex-col px-6 pb-8">
                {/* 1. Welcome Section (좌측 정렬 & 상단 배치) */}
                <div className="mt-12 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                        어서오세요!<br />
                        첫 멤버십을 추가해볼까요?
                    </h1>
                </div>

                {/* 2. Illustration with Floating Icons */}
                <div className="flex-1 relative flex items-center justify-center -mt-10">
                    {/* Main Character (Barkit) - Center */}
                    <div className="relative z-10 w-40 h-40 flex items-center justify-center animate-float">
                        <BarkitIcon className="w-full h-full" />
                    </div>

                    {/* Floating Brand Icons (순수 아이콘, 배경 없음) */}
                    {/* Hyundai (좌측 상단) */}
                    <div
                        className="absolute top-[30%] left-10 z-0 animate-float w-16 h-16"
                        style={{ animationDuration: '3.5s', animationDelay: '0s' }}
                    >
                        <HyundaiIcon className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* KT (우측 상단) */}
                    <div
                        className="absolute top-[25%] right-10 z-0 animate-float w-16 h-16"
                        style={{ animationDuration: '4.2s', animationDelay: '1s' }}
                    >
                        <KTIcon className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* Olive Young (좌측 하단) */}
                    <div
                        className="absolute bottom-[35%] left-5 z-0 animate-float w-16 h-16"
                        style={{ animationDuration: '3.8s', animationDelay: '0.5s' }}
                    >
                        <OliveYoungIcon className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* Happy Point (우측 하단) */}
                    <div
                        className="absolute bottom-[30%] right-5 z-0 animate-float w-16 h-16"
                        style={{ animationDuration: '3s', animationDelay: '1.5s' }}
                    >
                        <HappyPointIcon className="w-full h-full drop-shadow-md" />
                    </div>
                </div>

                {/* 3. Next Button -> Register 페이지로 이동 */}
                <div className="w-full pb-4">
                    <button
                        onClick={() => navigate('/onboarding/register')}
                        className="w-full py-4 rounded-full bg-[#00C0E8] text-white font-bold text-lg hover:bg-[#00B3D8] transition-colors shadow-lg"
                        aria-label="다음 단계로 이동"
                    >
                        다음
                    </button>
                </div>
            </main>
        </div>
    );
}