import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MembershipSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteMembership: () => void;
}

export default function MembershipSettingsSheet({
  isOpen,
  onClose,
  onDeleteMembership,
}: MembershipSettingsSheetProps) {
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

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 z-[70] transition-transform duration-300 ease-out">
        <div className="bg-white rounded-t-3xl shadow-lg max-w-[393px] h-[283px] mx-auto pb-8">
          <div className="pt-8 px-6">
            <div className="flex flex-col items-start space-y-2">
              {/* 멤버십 삭제하기 */}
              <button
                onClick={() => {
                  onDeleteMembership();
                  onClose();
                }}
                className="inline-block text-lg font-semibold py-3 cursor-pointer"
              >
                멤버십 삭제하기
              </button>

              {/* 바코드 변경하기 */}
              <button
                onClick={() => {
                  navigate('/membership/input');
                  onClose();
                }}
                className="inline-block text-lg font-semibold py-3 cursor-pointer"
              >
                바코드 변경하기
              </button>

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="w-full max-w-[343px] h-[56px] mt-5 text-center text-base font-bold text-white bg-[#00C0E8] rounded-[27.2px] cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}