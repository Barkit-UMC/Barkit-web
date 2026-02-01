import { useState } from 'react';
import { Icon } from '@iconify/react';
import FavoriteMembershipToast from '../../components/favorite/MembershipToast';

interface MembershipSettingBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSetFavorite?: (isFavorite: boolean) => void;
    onChangeBarcode?: () => void;
    onDelete?: () => void;
}

export default function MembershipSettingBottomSheet({
    isOpen,
    onClose,
    onSetFavorite,
    onChangeBarcode,
    onDelete,
}: MembershipSettingBottomSheetProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showToast, setShowToast] = useState(false);

    if (!isOpen) return null;

    const handleToggleFeatured = () => {
        const newValue = !isFavorite;
        setIsFavorite(newValue);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        onSetFavorite?.(newValue);
    };

    return (
        <>
            {/* 배경 오버레이 */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* 바텀시트 */}
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
                            onClick={handleToggleFeatured}
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
                        onClick={onChangeBarcode}
                        className="flex items-center gap-3 w-full py-3"
                    >
                        <Icon icon="fa7-solid:repeat" width={24} height={24} className="text-gray-500" />
                        <span className="text-[20px] font-semibold text-gray-500">바코드 변경하기</span>
                    </button>

                    {/* 멤버십 삭제하기 */}
                    <button
                        onClick={onDelete}
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

            {/* 토스트 */}
            <FavoriteMembershipToast show={showToast} isFavorite={isFavorite} />
        </>
    );
}