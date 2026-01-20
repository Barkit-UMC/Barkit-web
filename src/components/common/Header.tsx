import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

/**
 * 고정(Header fixed) 공통 헤더 컴포넌트
 */
export default function Header({
  title,
  showBackButton = true,
  rightAction,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white w-full h-[128px] border-b border-gray-200">
      <div className="relative flex items-end h-full px-4 pb-4">
        {/* 뒤로가기 */}
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="absolute left-[16px] pl-2 rounded-full"
            aria-label="뒤로가기"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* 타이틀 */}
        {title && (
          <h1 className="mx-auto text-xl font-semibold">
            {title}
          </h1>
        )}
        {/* 우측 액션 */}
        <div className="absolute right-4 bottom-2">
          {rightAction}
        </div>
      </div>
    </header>
  );
}
