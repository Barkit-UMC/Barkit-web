import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import BarcodeCard from '../../components/barcode/BarcodeCard';
import iconParisBaguette from '../../assets/icons/stores/parisBaguette.svg';
import iconOliveYoung from '../../assets/icons/stores/oliveYoung.svg';
import iconStarbucks from '../../assets/icons/stores/starbucks.svg';
import iconPlusLine from '../../assets/icons/stores/plusLine.svg';

export default function WalletPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'stacked' | 'spread' | 'list'>('stacked');

  // 멤버십 (임시)
  const memberships = [
    {
      id: 1,
      brandName: 'Starbucks',
      brandLogo: iconStarbucks,
      points: 5000,
      color: 'bg-gradient-to-br from-green-600 to-green-700',
      barcodeNumber: '1234567890123',
    },
    {
      id: 2,
      brandName: 'KT',
      brandLogo: undefined,
      points: 6000,
      color: 'bg-gradient-to-br from-red-600 to-red-700',
      barcodeNumber: '9876543210987',
    },
    {
      id: 3,
      brandName: '브랜드명',
      brandLogo: undefined,
      points: 3000,
      color: 'bg-gradient-to-br from-orange-400 to-orange-500',
      barcodeNumber: '5555666677778',
    },
    {
      id: 4,
      brandName: '브랜드명',
      brandLogo: undefined,
      points: 8000,
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
      barcodeNumber: '1111222233334',
    },
  ];

  // 즐겨찾기 매장 (임시)
  const favoriteStores = [
    { id: 1, icon: iconParisBaguette, isSvg: true, isPlus: false },
    { id: 2, icon: iconOliveYoung, isSvg: true, isPlus: false },
    { id: 3, icon: iconStarbucks, isSvg: true, isPlus: false },
    { id: 4, icon: iconPlusLine, isSvg: true, isPlus: true },
    { id: 5, icon: iconPlusLine, isSvg: true, isPlus: true },
  ];

  const handleStackedCardClick = () => {
    if (viewMode === 'stacked') {
      setViewMode('spread');
    } else if (viewMode === 'spread') {
      setViewMode('stacked');
    }
  };

  const handleMoreClick = () => {
    navigate('/barcode/list');
  };

  return (
    <Layout showBottomNav>
      <div className="bg-[#F9F9F9] min-h-screen">
        {memberships.length > 0 ? (
          <>
            <div className="flex justify-center pt-4">
              <div className="w-[343px]">
                {/* 나의 바코드 헤더 */}
                <div className="flex items-center justify-between mb-4 w-[306px] h-[28px] mx-auto">
                  <h2 className="text-lg font-bold">나의 바코드</h2>
                  <button
                    className="text-cyan-500 text-sm font-bold"
                    onClick={handleMoreClick}
                  >
                    더보기
                  </button>
                </div>

                {/* 겹쳐진 카드들 */}
                <div
                  className="relative mb-12 transition-all duration-800"
                  style={{
                    height:
                      viewMode === 'stacked'
                        ? `${211 + (memberships.length - 1) * 18}px`
                        : `${211 + (memberships.length - 1) * 70}px`,
                  }}
                >
                  {memberships.map((membership, index) => {
                    const isStacked = viewMode === 'stacked';

                    return (
                      <div
                        key={membership.id}
                        className="absolute transition-all duration-800 ease-in-out w-[343.01px] h-[211.08px]"
                        style={{
                          left: '50%',
                          transform: `
                            translateX(-50%)
                            ${isStacked ? `scale(${1 - index * 0.05})` : 'scale(1)'}
                          `,
                          top: isStacked
                            ? `${(memberships.length - 1 - index) * 18}px`
                            : `${(memberships.length - 1 - index) * 70}px`,
                          zIndex: memberships.length - index,
                        }}
                      >
                        <BarcodeCard
                          brandName={membership.brandName}
                          brandLogo={membership.brandLogo}
                          color={membership.color}
                          points={membership.points}
                          onClick={handleStackedCardClick}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* 매장 즐겨찾기 */}
                <div className="bg-white rounded-2xl h-[98px] flex items-center justify-center">
                  <div className="inline-flex gap-4">
                    {favoriteStores.map((store) => (
                      <div
                        key={store.id}
                        className={`w-[46.38px] h-[46.38px] rounded-lg flex items-center justify-center overflow-hidden ${
                          store.isPlus ? 'bg-gray-200' : 'bg-white'
                        }`}
                      >
                        {store.isSvg ? (
                          <img
                            src={store.icon}
                            alt="store-icon"
                            className={store.isPlus ? "w-[24px] h-[24px]" : "w-full h-full object-cover"}
                          />
                        ) : (
                          <span className="leading-none text-2xl">{store.icon}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 배너 */}
                <div className="w-full h-24 bg-[#FFB5B5] rounded-2xl flex items-center justify-center mt-8">
                  배너 영역
                </div>

                <div className="flex justify-center items-center gap-1 mt-3 w-[35px] h-[7px] mx-auto">
                  <div className="w-[7px] h-[7px] rounded-full bg-cyan-500"></div>
                  <div className="w-[7px] h-[7px] rounded-full bg-gray-300"></div>
                  <div className="w-[7px] h-[7px] rounded-full bg-gray-300"></div>
                </div>

              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-5">...</div>
        )}
      </div>
    </Layout>
  );
}