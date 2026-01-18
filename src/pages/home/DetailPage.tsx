import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import iconOliveYoung from '../../assets/icons/stores/oliveYoung.svg';
import iconStarbucks from '../../assets/icons/stores/starbucks.svg';
import iconSetting from '../../assets/icons/detail/setting.svg'
import barcode from '../../assets/images/barcodes/barcode.svg'
import ktCardImage from '../../assets/images/cards/ktCard.svg'
import { useNavigate, useParams } from 'react-router-dom';
import MembershipSettingSheet from '../../components/detail/MembershipSettingSheet';
import MembershipDeleteModal from '../../components/detail/MembershipDeleteModal';

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 브랜드 정보 (임시)
  const brandName = 'KT';
  const membershipNumber = '2917-1019-4044-2547';

  // 적립/할인 가능한 매장 (임시)
  const favoriteStores = [
    { id: 1, icon: iconOliveYoung, isSvg: true },
    { id: 2, icon: iconStarbucks, isSvg: true },
    { id: 3, icon: undefined, isSvg: false },
    { id: 4, icon: undefined, isSvg: false },
    { id: 5, icon: undefined, isSvg: false },
  ];

  const handleMoreClick = () => {
    navigate(`/barcode/${id}/benefits`);
  };

  const handleSettingClick = () => {
    setIsSettingOpen(true);
  }

  const handleDeleteMembership = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: 멤버십 삭제 API 호출
    console.log('멤버십 삭제 확정');
    // 삭제 후 홈으로 이동
    navigate('/home');
  };

  const handleChangeBarcode = () => {
    // TODO: 바코드 변경 로직
    console.log('바코드 변경');
  };

  return (
    <Layout showBottomNav>
      <div className="bg-[#F9F9F9] min-h-screen">
        <Header title={`${brandName} 바코드`} />

        <div className="flex justify-center pt-4">
          <div className="w-[343px]">

            {/* 설정 아이콘 */}
            <div className="flex justify-end mb-4 px-1">
              <button
                onClick={handleSettingClick}
                className="cursor-pointer"
              >
                <img
                  src={iconSetting}
                  alt="설정"
                  className="w-6 h-6"
                />
              </button>
            </div>

            <div className="w-[343px] h-[400.96px] rounded-2xl mb-4">
              {/* 멤버십 카드 */}
              <div className="w-full h-[211.08px] bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                <img src={ktCardImage} alt="멤버십 카드 이미지" className="object-contain"></img>
              </div>

              {/* 멤버십 바코드 */}
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <img src={barcode} alt="멤버십 바코드" className="w-[318px] h-[176px] object-contain" />
                </div>
              </div>
            </div>

            {/* 적립/할인 가능한 매장 */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3 max-w-[309px] mx-auto">
                <h2 className="text-lg font-semibold">적립/할인 가능한 매장</h2>
                <button 
                  onClick={handleMoreClick}
                  className="text-cyan-500 text-sm font-bold cursor-pointer"
                >
                  더보기
                </button>
              </div>

              <div className="bg-white rounded-2xl h-[98px] flex items-center justify-center">
                <div className="inline-flex gap-4">
                  {favoriteStores.map((store) => (
                    <div
                      key={store.id}
                      className={`w-[46.38px] h-[46.38px] rounded-lg flex items-center justify-center overflow-hidden ${
                        store.icon ? 'bg-white' : 'bg-gray-200'
                      }`}
                    >
                      {store.icon ? (
                        <img
                          src={store.icon}
                          alt="store-icon"
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 설정 Bottom Sheet */}
      <MembershipSettingSheet
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
        onDeleteMembership={handleDeleteMembership}
        onChangeBarcode={handleChangeBarcode}
      />

      {/* 멤버십 삭제 모달 */}
      <MembershipDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        brandName={brandName}
        membershipNumber={membershipNumber}
      />
    </Layout>
  );
}