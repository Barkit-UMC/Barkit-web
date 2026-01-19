// src/pages/onboarding/OnboardingLayout.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

/**
 * 온보딩 공통 레이아웃
 * - 모바일 규격 (max-w-[390px])
 * - 뒤로가기 버튼
 * - Outlet으로 하위 페이지 렌더링
 */
export default function OnboardingLayout() {
    const navigate = useNavigate();

    return (
        <div className="w-[390px] min-h-screen mx-auto bg-white flex flex-col">
            {/* Header */}
            <header className="relative flex items-center justify-center h-14 mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="뒤로가기"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}
