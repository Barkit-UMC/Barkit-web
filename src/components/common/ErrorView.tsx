import { type ReactNode } from 'react';
import BarkitWonderIcon from '../../assets/icons/Barkit_icon_wonder.svg?react';
import BarkitShadowIcon from '../../assets/icons/Barkit_icon_shadow.svg?react';
import QuestionMarkIcon from '../../assets/icons/question_mark.svg?react';
import Button from './Button';

interface ErrorViewProps {
    title: ReactNode;
    primaryButtonText: string;
    onPrimaryClick: () => void;
    secondaryButtonText?: string;
    onSecondaryClick?: () => void;
}

/**
 * 에러/실패 결과 화면 공통 컴포넌트
 * - 물음표 boing 애니메이션
 * - 캐릭터 일러스트 (어리둥절 표정)
 * - Primary / Secondary 버튼
 */
export default function ErrorView({
    title,
    primaryButtonText,
    onPrimaryClick,
    secondaryButtonText,
    onSecondaryClick,
}: ErrorViewProps) {
    return (
        <div className="w-[390px] min-h-screen mx-auto bg-white flex flex-col">
            {/* Boing Animation Style */}
            <style>{`
                @keyframes boing {
                    0% {
                        transform: scale(0) rotate(-20deg);
                        opacity: 0;
                    }
                    30% {
                        transform: scale(1.5) rotate(10deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.05) rotate(-5deg);
                    }
                    70% {
                        transform: scale(1.25) rotate(3deg);
                    }
                    85% {
                        transform: scale(1.15) rotate(-2deg);
                    }
                    100% {
                        transform: scale(1.15) rotate(0deg);
                        opacity: 1;
                    }
                }
                .animate-boing {
                    animation: boing 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                }
                @keyframes tilt {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    25% {
                        transform: rotate(-8deg);
                    }
                    75% {
                        transform: rotate(8deg);
                    }
                }
                .animate-tilt {
                    animation: tilt 2s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>

            {/* Content */}
            <main className="flex-1 flex flex-col items-start justify-center px-6 pt-32 pb-4">
                {/* Title */}
                <div className="w-full text-left mb-40">
                    <h1 className="text-[28px] font-semibold text-gray-900 leading-tight">
                        {title}
                    </h1>
                </div>

                {/* Illustration Area with shadow */}
                <div className="flex flex-col items-center self-center mb-20">
                    <div className="relative w-40 h-40">
                        {/* Character */}
                        <BarkitWonderIcon className="w-full h-full animate-tilt" />
                        {/* Question Mark - positioned top-right with boing animation */}
                        <div className="absolute -top-4 -right-6 w-10 h-10 animate-boing">
                            <QuestionMarkIcon className="w-full h-full" />
                        </div>
                    </div>
                    {/* Shadow below the character */}
                    <BarkitShadowIcon className="w-32 mt-2" />
                </div>
            </main>

            {/* Bottom Buttons */}
            <div className="px-6 pb-12 space-y-[10px]">
                <Button
                    onClick={onPrimaryClick}
                    variant="primary"
                >
                    {primaryButtonText}
                </Button>
                {secondaryButtonText && onSecondaryClick && (
                    <Button
                        onClick={onSecondaryClick}
                        variant="secondary"
                    >
                        {secondaryButtonText}
                    </Button>
                )}
            </div>
        </div>
    );
}