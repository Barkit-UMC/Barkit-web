import React, { useState } from 'react';
import call from '../../assets/icons/map/call.svg'
import navigation from '../../assets/icons/map/navigation.svg'
import kt from '../../assets/icons/memberships/kt.svg'
import oliveyoung from '../../assets/icons/memberships/oliveyoung.svg'
import { useNavigate } from 'react-router-dom';

// 데이터 타입 정의
interface StoreItem {
  id: number;
  name: string;
  category: string;
  distance: string;
  address: string;
}

interface SearchResultListProps {
  results: StoreItem[];
}

const SearchResultList = ({ results }: SearchResultListProps) => {
  const navigate = useNavigate(); // 2. 네비게이트 함수 초기화

  // 클릭 핸들러: 상세 페이지로 이동
  const handleStoreClick = (id: number) => {
    navigate(`/store/${id}`); // 예: /store/1 경로로 이동
  };


  return (
    <div className="flex flex-col !px-6 h-full pb-20 overflow-y-auto">
      {/* 매장 리스트 반복 */}
      {results.map((store) => (
        <div 
            key={store.id} 
            className="!py-5 border-b border-gray-100 last:border-0"
            onClick={() => handleStoreClick(store.id)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-gray-900">{store.name}</h3>
                <span className="text-gray-300 text-sm font-normal">{store.category}</span>
              </div>
              <p className="text-sm text-gray-500 !mt-1">
                <span className="font-semibold text-gray-700">{store.distance}</span>
                <span className="!mx-1 text-gray-300">|</span>
                {store.address}
              </p>
              
              {/* 보유 멤버십 아이콘 (예시) */}
              <div className="flex justify-between items-end !mt-4">
                {/* 왼쪽: 멤버십 정보 부문 */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-gray-500 font-medium">적용 가능 보유 멤버십</span>
                    <div className="flex gap-1.5">
                        {/* 멤버십 아이콘 이미지들 */}
                        <img src={kt} alt="KT" className="w-7 h-7 object-contain rounded-lg shadow-sm" />
                        <img src={oliveyoung} alt="OK" className="w-7 h-7 object-contain rounded-lg shadow-sm" />
                    </div>
                </div>

                {/* 우측 액션 버튼들 */}
                <div className="flex gap-3">
                    {/* 전화 버튼 */}
                    <button className="transition-transform active:scale-90">
                        <img src={call} alt="전화" className="w-12 h-12 object-contain" />
                    </button>
                    {/* 길찾기 버튼 */}
                    <button className="transition-transform active:scale-90">
                        <img src={navigation} alt="길찾기" className="w-12 h-12 object-contain shadow-sm rounded-full" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default SearchResultList;