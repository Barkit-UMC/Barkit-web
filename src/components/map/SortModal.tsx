import React from 'react';
import IconCancel from '../../assets/icons/map/cancel.svg';

// 개별 옵션에 대한 타입 정의
interface SortOption {
  id: string;
  label: string;
  icon: string;
}

interface SortModalProps {
  title: string;
  options: SortOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const cancelIcon = IconCancel;

const SortModal = ({ title, options, selectedValue, onSelect, onClose }: SortModalProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {/* 모달 컨테이너 */}
      <div className="w-[320px] h-[200px] bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h2 className="!mt-4 !ml-4 !mb-4 text-lg font-bold text-gray-800">{title}</h2>
          <button 
            onClick={onClose}
            className="!mr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <img
                src = {cancelIcon}
            />
          </button>
        </div>

        {/* 옵션 리스트 영역 */}
        <div className="flex flex-col">
          {options.map((option) => {
            const isSelected = selectedValue === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`!ml-4 h-16 w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all
                  ${isSelected ? 'text-cyan-500' : 'text-gray-400 hover:bg-gray-50'}
                `}
              >
                {/* 아이콘 */}
                <img 
                  src={option.icon} 
                  alt={option.label}
                  className={`w-5 h-5 object-contain ${isSelected ? '' : 'grayscale opacity-60'}`} 
                />
                
                {/* 텍스트 */}
                <span className={`text-base font-medium ${isSelected ? 'text-cyan-500' : 'text-gray-400'}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortModal;