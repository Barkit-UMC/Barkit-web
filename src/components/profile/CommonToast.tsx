import { useEffect, useState } from "react";
import notiOn from "../../assets/icons/toast/notification-on.svg";
import notiOff from "../../assets/icons/toast/notification-off.svg";
import locOn from "../../assets/icons/toast/location-on.svg";
import locOff from "../../assets/icons/toast/location-off.svg";
import IconComplete from "../../assets/icons/toast/complete.svg";

type CommonToastProps = {
  type: "notification" | "location" | "password" | "birthday";
  status?: "on" | "off";
  onClose?: () => void;
};

export default function CommonToast({ type, status, onClose }: CommonToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 등장
    setVisible(true);

    // 2초 후 fade-out
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    // fade-out 끝난 뒤 unmount
    const removeTimer = setTimeout(() => {
      onClose?.();
    }, 2300); // duration(300ms)보다 살짝 크게

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };

  }, []);

  const icon = {
    notification: status === "on" ? notiOn : notiOff,
    location: status === "on" ? locOn : locOff,
    password: IconComplete,
    birthday: IconComplete,
  };

  const message = {
    notification: status === "on"
      ? "알림 설정이 허용되었습니다."
      : "알림 설정이 거절되었습니다.",
    location: status === "on"
      ? "위치 권한 요청이 허용되었습니다."
      : "위치 권한 요청이 거절되었습니다.",
    password: "비밀번호 변경이 완료되었습니다.",
    birthday: "생년월일 변경이 완료되었습니다.",
    
  };

  return (
    <div
      className={`
        fixed bottom-20 left-1/2 -translate-x-1/2 w-85 h-16
        bg-[#006F98] rounded-lg shadow-lg
        px-4 py-3 flex items-center justify-center space-x-3

        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      <img src={icon[type]} alt="" className="w-5 h-5" />
      <span className="text-white text-[16px] font-semibold">
        {message[type]}
      </span>
    </div>
  );
}