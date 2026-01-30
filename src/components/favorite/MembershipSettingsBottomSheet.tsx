import FavoriteIcon from '../../assets/icons/bottomSheet/favorite.svg';
import ChangeIcon from '../../assets/icons/bottomSheet/change.svg';
import DeleteIcon from '../../assets/icons/bottomSheet/delete.svg';

interface MembershipSettingBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSetFavorite?: () => void;
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
    if (!isOpen) return null;

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
                    <button
                        onClick={onSetFavorite}
                        className="flex items-center gap-3 w-full py-3"
                    >
                        <img src={FavoriteIcon} alt="대표" className="w-6 h-6" />
                        <span className="text-[20px] font-semibold">대표 멤버십 설정하기</span>
                    </button>

                    {/* 바코드 변경하기 */}
                    <button
                        onClick={onChangeBarcode}
                        className="flex items-center gap-3 w-full py-3"
                    >
                        <img src={ChangeIcon} alt="변경" className="w-6 h-6" />
                        <span className="text-[20px] font-semibold">바코드 변경하기</span>
                    </button>

                    {/* 멤버십 삭제하기 */}
                    <button
                        onClick={onDelete}
                        className="flex items-center gap-3 w-full py-3"
                    >
                        <img src={DeleteIcon} alt="삭제" className="w-6 h-6" />
                        <span className="text-[20px] font-semibold">멤버십 삭제하기</span>
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
        </>
    );
}