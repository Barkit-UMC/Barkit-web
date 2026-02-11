import { useEffect, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd-mobile';
import koKR from 'antd-mobile/es/locales/ko-KR';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import CommonToast from '../../components/profile/CommonToast';
import { userApi, type changeBirthResponse, type UserResponse } from '../../api/user';

export default function ChangeBirthdayPage() {
  const initialBirthday = new Date();
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(initialBirthday);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo: UserResponse = await userApi.getMyInfo();
        if (userInfo.birthDate) {
          setBirthday(new Date(userInfo.birthDate));
        } else {
          setBirthday(null);
        }
      } catch (err) {
        console.error('사용자 정보 불러오기 실패:', err);
      }
    };

    fetchUser();
  }, []);

  const handleConfirm = async (date: Date) => {
    setOpen(false);

    // 날짜를 YYYY-MM-DD 형식으로 안전하게 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // 이전과 날짜가 같다면 API 호출 안 함
    const currentFormatted = birthday ? 
      `${birthday.getFullYear()}-${String(birthday.getMonth() + 1).padStart(2, '0')}-${String(birthday.getDate()).padStart(2, '0')}` 
      : null;

    if (currentFormatted === formattedDate) return;

    setLoading(true);

    try {
      // 서버에 변경 요청
      const updatedUser = await userApi.updateBirthDate(formattedDate);

      console.log('생년월일 변경 성공:', updatedUser.birthDate);

      // 서버에서 받은 "2026-02-11" 문자열을 Date 객체로 변환
      setBirthday(new Date(updatedUser.birthDate));
      setShowToast(true);
    } catch (err) {
      console.error('생년월일 변경 실패:', err);
      alert('생년월일 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider locale={koKR}>
      <Layout>
        {/* 페이지 전용 헤더 */}
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

        {showToast && (
          <CommonToast 
            type="birthday"
            onClose={() => setShowToast(false)}
          />
        )}
      </Layout>
    </ConfigProvider>
  );
}
