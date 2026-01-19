// src/pages/onboarding/CompletePage.tsx
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../store/useOnboardingStore';

/**
 * Step 4: 등록 완료 페이지
 * - 성공 메시지
 * - 축하 일러스트
 * - 홈으로 버튼 (Store reset)
 */
export default function CompletePage() {
    const navigate = useNavigate();
    const { reset } = useOnboardingStore();

    const handleGoHome = () => {
        reset(); // Clear onboarding state
        navigate('/home');
    };

    return (
        <div className="flex-1 flex flex-col px-6 pb-8">
            {/* Success Message */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    축하합니다!
                </h1>
                <p className="text-lg text-gray-600">
                    멤버십 등록이 완료되었어요
                </p>

                {/* Celebration Illustration */}
                <div className="mt-8 w-48 h-48 relative">
                    {/* Yellow character circle */}
                    <div className="w-36 h-36 bg-yellow-400 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="text-5xl">🎉</span>
                    </div>
                    {/* Confetti decorations */}
                    <div className="absolute top-0 left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                    <div className="absolute bottom-8 left-4 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                    <div className="absolute bottom-4 right-8 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <div className="absolute top-8 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                    {/* Stars */}
                    <div className="absolute top-2 right-8 text-xl animate-pulse">✨</div>
                    <div className="absolute bottom-12 left-0 text-lg animate-pulse" style={{ animationDelay: '500ms' }}>⭐</div>
                </div>
            </div>

            {/* Home Button */}
            <button
                onClick={handleGoHome}
                className="w-full py-4 rounded-full bg-[#00C0E8] text-white font-bold text-lg hover:bg-[#00B3D8] transition-colors"
            >
                홈으로
            </button>
        </div>
    );
}
