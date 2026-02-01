import React from 'react';
import { MapPin, Target, X } from 'lucide-react'; // 아이콘 라이브러리 예시

const BottomSheet = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      {/* 배경 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* 바텀시트 본체 */}
      <div className="relative w-full max-w-md animate-slide-up rounded-t-[32px] bg-white p-6 pb-10 shadow-xl">
        
        {/* 리스트 구역 */}
        <div className="flex flex-col gap-4">
          
          {/* 1. 지도 중심 거리순 */}
          <button className="flex items-center gap-4 py-3 px-2 active:bg-gray-50 rounded-xl transition-colors">
            <div className="text-cyan-500">
              <MapPin size={24} fill="currentColor" fillOpacity={0.2} />
            </div>
            <span className="text-lg font-semibold text-cyan-500">지도 중심 거리순</span>
          </button>

          {/* 2. 현재 내 위치 거리순 */}
          <button className="flex items-center gap-4 py-3 px-2 active:bg-gray-50 rounded-xl transition-colors">
            <div className="text-gray-400">
              <Target size={24} />
            </div>
            <span className="text-lg font-medium text-gray-400">현재 내 위치 거리순</span>
          </button>
          
        </div>

        {/* 하단 취소 버튼 */}
        <button 
          onClick={onClose}
          className="mt-6 w-full py-4 bg-gray-100 rounded-3xl text-cyan-500 font-bold text-lg hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;