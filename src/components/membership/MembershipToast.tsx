import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type FavoriteMembershipToastProps = {
  isFavorite: boolean;
  onClose?: () => void;
};

export default function FavoriteMembershipToast({ isFavorite, onClose }: FavoriteMembershipToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    const removeTimer = setTimeout(() => {
      onClose?.();
    }, 2300);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-24 left-1/2 -translate-x-1/2 z-50
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      <div className="flex items-center justify-center gap-[10px] rounded-[10px] w-[343px] h-[65px] bg-[#006F98]">
        <div className="flex-shrink-0 flex items-center justify-center w-[20px] h-[20px]">
          <Icon 
            icon="mynaui:star-solid" 
            width={20} 
            height={20}
            className={isFavorite ? 'text-yellow-400' : 'text-gray-300'}
          />
        </div>
        <span className="text-white text-[16px] font-semibold leading-[20px]">
          {isFavorite 
            ? '대표 멤버십으로 설정되었습니다' 
            : '대표 멤버십이 해제되었습니다'}
        </span>
      </div>
    </div>
  );
}