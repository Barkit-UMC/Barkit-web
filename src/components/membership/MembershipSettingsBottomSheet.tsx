import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import FavoriteMembershipToast from './MembershipToast';
import { useNavigate } from 'react-router-dom';
import MembershipDeleteModal from './MembershipDeleteModal';
import { membershipApi } from '../../api/membership';

interface MembershipSettingBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSetFavorite?: (isFavorite: boolean) => void;
    onDelete?: () => void;
    brandName?: string;
    membershipNumber?: string;
    membershipId: string;
    isMain?: boolean;
}

export default function MembershipSettingBottomSheet({
    isOpen,
    onClose,
    onSetFavorite,
    onDelete,
    brandName = '',
    membershipNumber = '',
    membershipId,
    isMain = false,
}: MembershipSettingBottomSheetProps) {
    const [isFavorite, setIsFavorite] = useState(isMain);
    const [showToast, setShowToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const navigate = useNavigate();

    // isMain prop이 바뀌면 동기화
    useEffect(() => {
        setIsFavorite(isMain);
    }, [isMain]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen && !showToast) return null;

    const handleToggleFavorite = async () => {
        if (!membershipId || isToggling) return;

        setIsToggling(true);
        try {
            const response = await membershipApi.toggleMainMembership(Number(membershipId));
            if (response.isSuccess) {
                const newValue = !isFavorite;
                setIsFavorite(newValue);
                setShowToast(true);
                onSetFavorite?.(newValue);
                onClose();
            } else {
                alert(response.message || '대표 멤버십 설정에 실패했습니다.');
            }
        } catch (err) {
            console.error('Toggle main membership error:', err);
            alert('대표 멤버십 설정 중 오류가 발생했습니다.');
        } finally {
            setIsToggling(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!membershipId || isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await membershipApi.deleteUserMembership(Number(membershipId));
            if (response.isSuccess) {
                onDelete?.();
                setShowDeleteModal(false);
                onClose();
                navigate('/home', { replace: true });
            } else {
                alert(response.message || '멤버십 삭제에 실패했습니다.');
                setShowDeleteModal(false);
            }
        } catch (err) {
            console.error('Delete membership error:', err);
            alert('멤버십 삭제 중 오류가 발생했습니다.');
            setShowDeleteModal(false);
        } finally {
            setIsDeleting(false);
        }
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
                                    ${isToggling ? 'opacity-50 pointer-events-none' : ''}
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
                                if (!membershipId) return;
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