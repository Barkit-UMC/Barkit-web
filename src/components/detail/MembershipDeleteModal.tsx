import { useEffect } from 'react';

interface MembershipDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  brandName: string;
  membershipNumber: string;
}

export default function MembershipDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  brandName,
  membershipNumber,
}: MembershipDeleteModalProps) {
  useEffect(() => {
  if (isOpen) {
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-[80] transition-opacity"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-[343px] h-[247px] mx-auto flex flex-col justify-center">
          {/* 제목 */}
          <div className="pt-6 pb-4 px-6">
            <span className="text-lg font-semibold text-left">
              정말 삭제하시겠습니까?
            </span>
          </div>

          {/* 내용 */}
          <div className="px-6 pb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-400">브랜드</span>
                <span className="text-base font-medium text-gray-400">{brandName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base text-gray-400">멤버십 번호</span>
                <span className="text-base font-medium text-gray-400">{membershipNumber}</span>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 px-6 pb-6">
            <button
              onClick={onClose}
              className="flex-1 w-[140px] h-[47px] text-base font-semibold text-[#00C0E8] bg-[#AAE8F5]/20 rounded-[17.46px]"
            >
              아니오
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 w-[140px] h-[47px] text-base font-semibold text-white bg-[#00C0E8] rounded-[17.46px] cursor-pointer"
            >
              네
            </button>
          </div>
        </div>
      </div>
    </>
  );
}