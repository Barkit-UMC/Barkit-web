interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    size?: 'sm' | 'md';
}

/**
 * 커스텀 체크박스 컴포넌트
 * 체크 시 초록색 배경 적용
 */
export default function Checkbox({
    checked,
    onChange,
    label,
    size = 'sm',
}: CheckboxProps) {
    const sizeClasses = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    const labelClasses = size === 'md' ? 'font-semibold text-base' : 'text-xs text-gray-600';
    const gapClasses = size === 'md' ? 'gap-3' : 'gap-4';

    return (
        <label className={`flex items-center ${gapClasses} cursor-pointer`}>
            <div
                className={`${sizeClasses} rounded flex items-center justify-center ${checked ? 'bg-[#34C759]' : 'bg-gray-200'
                    }`}
                onClick={() => onChange(!checked)}
            >
                <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <span className={labelClasses}>{label}</span>
        </label>
    );
}
