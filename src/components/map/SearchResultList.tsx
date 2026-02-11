import React, { useState } from 'react';
import call from '../../assets/icons/map/call.svg'
import navigation from '../../assets/icons/map/navigation.svg'
import kt from '../../assets/icons/memberships/kt.svg'
import oliveyoung from '../../assets/icons/memberships/cjone.svg'
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { mapApi, SearchStoresRequest } from '../../api/map';

const SearchResultList = ({ results, fetchNextPage, hasNextPage, isFetchingNextPage }: any) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col !px-6 h-full pb-20 overflow-y-auto">
      {/* 매장 리스트 반복 */}
      {results.map((store: any) => (
        <div 
            key={store.storeId} 
            className="!py-5 border-b border-gray-100 last:border-0"
            onClick={() => navigate(`/map/${store.storeId}`)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-gray-900">{store.name}</h3>
              </div>
              <p className="text-sm text-gray-500 !mt-1">
                <span className="font-semibold text-gray-700">
                  {store.distanceKm < 1 
                    ? `${Math.round(store.distanceKm * 1000)}m` 
                    : `${store.distanceKm.toFixed(1)}km`}
                </span>
                <span className="!mx-1 text-gray-300">|</span>
                {store.address}
              </p>
              
              {/* 보유 멤버십 아이콘 (예시) */}
              <div className="flex justify-between items-end !mt-4">
                {/* 왼쪽: 멤버십 정보 부문 */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-gray-500 font-medium">사용 가능 멤버십</span>
                    <div className="flex gap-1.5">
                        {/* 멤버십 아이콘 이미지들 */}
                        {store.memberships?.map((m: any) => (
                          <img 
                            key={m.id} 
                            src={m.logoUrl} 
                            alt={m.name} 
                            className="w-7 h-7 object-contain rounded-lg shadow-sm border border-gray-50" 
                          />
                        ))}
                    </div>
                </div>

                {/* 우측 액션 버튼들 */}
                <div className="flex gap-3">
                  <button onClick={(e) => { e.stopPropagation(); window.location.href=`tel:${store.phone}` }}>
                    <img src={call} alt="전화" className="w-12 h-12 object-contain" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); window.open(store.directionUrl, '_blank') }}>
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