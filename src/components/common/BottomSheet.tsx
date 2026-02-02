import React from 'react';

interface SortOption {
  id: string;
  label: string;
  icon: string;
}

interface SortModalProps {
  options: SortOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const SortBottomSheet = ({ options, selectedValue, onSelect, onClose }: SortModalProps) => {
  return (
    /* 1. fixed로 변경하여 화면 전체를 덮고 z-index 최상단 확보 */
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      
      {/* 2. 배경 (딤 처리): 뒷 배경을 어둡게 하여 바텀시트 강조 */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={onClose} 
      />

      {/* 3. 바텀시트 컨테이너: 너비 반응형 처리 */}
      <div className="relative w-full bg-white rounded-t-[32px] pt-8 pb-10 px-6 shadow-2xl animate-slide-up-simple">
        
        {/* 옵션 리스트 영역 */}
        <div className="flex flex-col mb-6">
          {options.map((option) => {
            const isSelected = selectedValue === option.id;

            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  onClose();
                }}
                className="w-full flex items-center gap-4 py-4 transition-all active:bg-gray-50 rounded-xl px-2"
              >
                {/* 아이콘: 색상 필터링 대신 투명도와 그레이스케일 활용 */}
                <img
                  src={option.icon}
                  alt={option.label}
                  className={`w-6 h-6 object-contain transition-all ${
                    isSelected ? 'opacity-100' : 'grayscale opacity-30'
                  }`}
                  style={isSelected ? { filter: 'drop-shadow(0px 0px 1px #00C0E8)' } : {}}
                />

                {/* 텍스트: text-base(16px)를 기본으로 하고 굵기 조절 */}
                <span className={`text-[18px] font-medium tracking-tight transition-colors ${
                  isSelected ? 'text-[#00C0E8]' : 'text-gray-400'
                }`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 취소 버튼: 터치 영역 확보 및 배경색 조정 */}
        <button
          onClick={onClose}
          className="w-full bg-cyan-50 py-4 rounded-2xl text-[#00C0E8] text-[16px] font-medium active:scale-[0.98] transition-all"
        >
          취소
        </button>
        
        {/* iOS 홈 바 여백 대응 (safe-area) */}
        <div className="h-[var(--safe-area-inset-bottom)]" />
      </div>
    </div>
  );
};

export default SortBottomSheet;