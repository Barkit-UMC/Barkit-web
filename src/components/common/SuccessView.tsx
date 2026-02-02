import { useEffect, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import BarkitSmileIcon from '../../assets/icons/Barkit_icon_smile.svg?react';
import Button from './Button';

interface SuccessViewProps {
    title: ReactNode;
    buttonText: string;
    onButtonClick: () => void;
}

/**
 * 성공 결과 화면 공통 컴포넌트
 * - 폭죽 효과 (canvas-confetti)
 * - 캐릭터 애니메이션
 * - 타이틀, 설명, 버튼
 */
export default function SuccessView({
    title,
    buttonText,
    onButtonClick,
}: SuccessViewProps) {
    // 컴포넌트 마운트 시 Confetti 실행
    useEffect(() => {
        // 브랜드 컬러로 폭죽 터뜨리기
        const brandColors = ['#00C0E8', '#FFD233', '#FF4D4D', '#9F57FF'];

        // 첫 번째 폭죽 (중앙)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6, x: 0.5 },
            colors: brandColors,
        });

        // 두 번째 폭죽 (약간의 딜레이)
        const timer = setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: brandColors,
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: brandColors,
            });
        }, 250);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex h-full mx-auto bg-white flex flex-col">
            {/* Floating Animation Style */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float-slow {
                    animation: float 2.5s ease-in-out infinite;
                }
            `}</style>

            {/* Content */}
            <main className="flex-1 flex flex-col items-start justify-center px-6 pb-8">
                {/* Title */}
                <div className="w-full text-left mb-12">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {title}
                    </h1>
                </div>

                {/* Character with floating animation */}
                <div className="w-40 h-40 flex items-center justify-center animate-float-slow mb-12 self-center">
                    <BarkitSmileIcon className="w-full h-full drop-shadow-lg" />
                </div>
            </main>

            {/* Bottom Button */}
            <div className="px-6 pb-8">
                <Button
                    onClick={onButtonClick}
                    variant="cyan"
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}
