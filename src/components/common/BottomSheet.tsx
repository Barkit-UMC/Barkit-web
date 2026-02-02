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
    <div className="absolute inset-0 z-[9999] flex items-end justify-center">
      {/* 배경 터치 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 바텀시트 컨테이너: 사진처럼 하단 바닥에 딱 붙는 구조 */}
      <div className="relative w-full max-w-md bg-white rounded-t-[40px] pt-8 pb-8 px-6 shadow-2xl">
        
        {/* 옵션 리스트 영역 */}
        <div className="flex flex-col mb-3">
          {options.map((option) => {
            const isSelected = selectedValue === option.id;

            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  onClose();
                }}
                className="w-full flex items-center gap-4 py-3 transition-all active:opacity-60"
              >
                {/* 아이콘*/}
                <img
                  src={option.icon}
                  alt={option.label}
                  className={`w-5 h-5 object-contain ${isSelected ? '#00C0E8' : 'grayscale opacity-30'}`}
                />

                {/* 텍스트: 정렬 및 폰트 크기 조정 */}
                <span className={`text-[18px] font-medium tracking-tight ${isSelected ? 'text-[#00C0E8]' : 'text-gray-300'}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 취소 버튼: 박스 안에 포함된 둥근 버튼 스타일 */}
        <button
          onClick={onClose}
          className="w-full bg-[#f2fcfe] py-3 rounded-full text-[#00C0E8] text-[18px] font-medium text-xl"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default SortBottomSheet;