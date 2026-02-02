import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  path?: string;
}

/**
 * 고정(Header fixed) 공통 헤더 컴포넌트
 */
export default function Header({
  title,
  showBackButton = true,
  rightAction,
  path,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-200 transition-all">
      <div className="relative flex items-center justify-center h-[60px] px-4 mx-auto">
        {/* 뒤로가기 */}
        {showBackButton && (
          <button
            onClick={() => path ? navigate(path) : navigate(-1)}
            className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="뒤로가기"
          >
            <svg
              className="w-6 h-6"
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
          <h1 className="text-xl font-semibold">
            {title}
          </h1>
        )}
        {/* 우측 액션 */}
        <div className="absolute right-4">
          {rightAction}
        </div>
      </div>
    </header>
  );
}
