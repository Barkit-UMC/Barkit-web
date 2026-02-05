import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import FavoriteMembershipToast from './MembershipToast';
import { useNavigate } from 'react-router-dom';
import MembershipDeleteModal from './MembershipDeleteModal';

interface MembershipSettingBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSetFavorite?: (isFavorite: boolean) => void;
    onDelete?: () => void;
    brandName?: string;
    membershipNumber?: string;
    membershipId?: string;
}

export default function MembershipSettingBottomSheet({
    isOpen,
    onClose,
    onSetFavorite,
    onDelete,
    brandName = 'CJ ONE',
    membershipNumber = '1234-5678-9123-8284',
    membershipId,
}: MembershipSettingBottomSheetProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            // 스크롤 방지
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // 바텀시트와 토스트 중 하나라도 표시되어야 함
    if (!isOpen && !showToast) return null;

    const handleToggleFavorite = () => {
        const newValue = !isFavorite;
        setIsFavorite(newValue);
        setShowToast(true);
        onSetFavorite?.(newValue);
        onClose();
    };

    const handleDeleteConfirm = () => {
        // TODO: API 연결 후 삭제 완료/실패 결과 페이지로 라우팅 처리
        onDelete?.();
        setShowDeleteModal(false);
        onClose();

        // 홈으로 라우팅 추가
        navigate('/home');
    };

    return (
        <>
            {/* 배경 오버레이 */}
            {!showDeleteModal && isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            {/* 바텀시트 */}
            {!showDeleteModal && isOpen && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[393px] h-[346px] bg-white rounded-t-[24px] z-50 pb-8">
                    <div className="p-6 space-y-4">
                        {/* 대표 멤버십 설정하기 */}
                        <div className="flex items-center justify-between w-full py-3">
                            <div className="flex items-center gap-3">
                                <Icon icon="mynaui:star-solid" width={24} height={24} className="text-gray-500" />
                                <span className="text-[20px] font-semibold text-gray-500">대표 멤버십 설정하기</span>
                            </div>

                            {/* 온오프 버튼 */}
                            <div
                                onClick={handleToggleFavorite}
                                className={`
                                    w-[46px] h-[26px] rounded-full
                                    cursor-pointer transition-colors duration-300
                                    ${isFavorite ? 'bg-green-500' : 'bg-gray-300'}
                                    relative
                                `}
                            >
                                <div
                                    className={`
                                        absolute top-1/2 -translate-y-1/2
                                        w-[20px] h-[20px] bg-white rounded-full shadow-sm
                                        transform transition-transform duration-300
                                        ${isFavorite ? 'translate-x-[22px]' : 'translate-x-[4px]'}
                                    `}
                                />
                            </div>
                        </div>

                        {/* 바코드 변경하기 */}
                        <button
                            onClick={() => {
                                navigate(`/membership/${membershipId}/change/select-method`);
                                onClose();  
                            }}
                            className="flex items-center gap-3 w-full py-3"
                        >
                            <Icon icon="fa7-solid:repeat" width={24} height={24} className="text-gray-500" />
                            <span className="text-[20px] font-semibold text-gray-500">바코드 변경하기</span>
                        </button>

                        {/* 멤버십 삭제하기 */}
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="flex items-center gap-3 w-full py-3"
                        >
                            <Icon icon="tabler:trash" width={24} height={24} className="text-gray-500" />
                            <span className="text-[20px] font-semibold text-gray-500">멤버십 삭제하기</span>
                        </button>

                        {/* 취소 버튼 */}
                        <button
                            onClick={onClose}
                            className="w-full h-[54px] bg-[#00C0E8]/5 rounded-[28px] text-[#00C0E8] text-[16px] font-semibold mt-6"
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}

            {/* 토스트 */}
            {showToast && <FavoriteMembershipToast isFavorite={isFavorite} onClose={() => setShowToast(false)} />}

            {/* 삭제 확인 모달 */}
            <MembershipDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                brandName={brandName}
                membershipNumber={membershipNumber}
            />
        </>
    );
}