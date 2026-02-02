import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, ConfigProvider } from 'antd-mobile';
import koKR from 'antd-mobile/es/locales/ko-KR';
import Layout from '../../components/common/Layout';

export default function ChangeBirthdayPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(
    new Date(2003, 4, 19)
  );
  const [isModified, setIsModified] = useState(false);

  // 🔹 뒤로가기 (state 전달)
  const handleBack = () => {
    if (isModified) {
      navigate('/profile/edit', {
        state: { toast: 'birthday' },
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <ConfigProvider locale={koKR}>
      <Layout>
        {/* ✅ 페이지 전용 헤더 */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-40 bg-white w-[390px] h-[64px] border-b border-gray-200">
          <div className="relative flex items-center justify-center h-full px-4">
            <button
              onClick={handleBack}
              className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="뒤로가기"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h1 className="text-xl font-semibold">
              생년월일 변경
            </h1>
          </div>
        </header>

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
          onConfirm={(date) => {
            setBirthday(date);
            setIsModified(true);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
          title="생년월일 선택"
        />
      </Layout>
    </ConfigProvider>
  );
}
