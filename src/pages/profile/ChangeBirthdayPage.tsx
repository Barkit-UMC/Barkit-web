import { useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd-mobile';
import koKR from 'antd-mobile/es/locales/ko-KR';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import CommonToast from '../../components/profile/CommonToast';

export default function ChangeBirthdayPage() {
  const initialBirthday = new Date(2003, 4, 19); // 2003년 5월 19일 (월은 0부터 시작)
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(initialBirthday);
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = (date: Date) => {
    setOpen(false);

    if (birthday?.getTime() === date.getTime()) return;

    setBirthday(date);
    setShowToast(true);
  };

  return (
    <ConfigProvider locale={koKR}>
      <Layout>
        {/* ✅ 페이지 전용 헤더 */}
        <Header title="생년월일 변경" path="/profile/edit" />

        {/* 입력창 */}
        <div className="mt-20 px-[25px]">
          <button
            onClick={() => setOpen(true)}
            className="
              w-full h-[56px]
              border-b border-gray-300
              flex items-center justify-between
              text-[16px]
              text-gray-700
            "
          >
            <span>
              {birthday
                ? birthday.toLocaleDateString('ko-KR')
                : '생년월일을 선택해주세요'}
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* DatePicker */}
        <DatePicker
          visible={open}
          value={birthday}
          precision="day"
          min={new Date(1900, 0, 1)}
          max={new Date()}
          mouseWheel
          onConfirm={handleConfirm}
          onClose={() => setOpen(false)}
          title="생년월일 선택"
        />

        { showToast && (
            <CommonToast 
                type="birthday"
                onClose={() => setShowToast(false)}
            />
        ) }
      </Layout>
    </ConfigProvider>
  );
}
