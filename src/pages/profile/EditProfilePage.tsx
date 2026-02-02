import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconNaver from '../../assets/icons/sns/naver.svg';
import iconKakao from '../../assets/icons/sns/kakaotalk.svg';
import CommonToast from '../../components/profile/CommonToast';
import Header from '../../components/common/Header';

type LocationState = {
  toast?: 'password' | 'birthday';
};

/**
 * [PAGE 20] 내 정보 수정 페이지
 */
export default function EditProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: API에서 사용자 정보 가져오기
  const [name] = useState('홍길동');
  const [email] = useState('hong@example.com');
  const [phone] = useState('010-1234-5678');

    // 토스트 상태 (보일 때만 값 존재)
  const [toast, setToast] = useState<'password' | 'birthday' | null>(null);

  useEffect(() => {
    const state = location.state as LocationState | null;

    if (state?.toast) {
      setToast(state.toast);

      // state 제거 (뒤로가기 / 새로고침 중복 방지)
      navigate(location.pathname, { replace: true });
    }
  }, []);

  return (
    <Layout>
      <Header title="개인정보 변경" path="/profile" />

      {/* 정보 리스트 */}
      <div className="mt-16 mb-4">
        <div className="w-full h-18 bg-white flex items-center justify-between px-[25px]">
          <span className="text-[20px] font-semibold">이름</span>
          <span className="text-[20px] text-gray-500">{name}</span>
        </div>

        <div className="w-full h-18 bg-white flex items-center justify-between px-[25px]">
          <span className="text-[20px] font-semibold">이메일</span>
          <span className="text-[20px] text-gray-500">{email}</span>
        </div>

        <div className="w-full h-18 bg-white flex items-center justify-between px-[25px]">
          <span className="text-[20px] font-semibold">전화번호</span>
          <span className="text-[20px] text-gray-500">{phone}</span>
        </div>

        {/* 비밀번호 변경 */}
        <button
          onClick={() => navigate('/profile/edit/password')}
          className="w-full h-18 bg-white flex items-center justify-between pl-[25px] pr-[16px]"
        >
          <span className="text-[20px] font-semibold">비밀번호 변경</span>
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 생년월일 변경 */}
        <button
          onClick={() => navigate('/profile/edit/birthday')}
          className="w-full h-18 bg-white flex items-center justify-between pl-[25px] pr-[16px]"
        >
          <span className="text-[20px] font-semibold">생년월일 변경</span>
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 연동 */}
      <div className="flex-1 border-[4px] border-gray-100" />
      <div className="mt-6 mb-12 flex justify-center">
        <img src={iconKakao} className="w-[60px] h-[60px] mx-4" />
        <img src={iconNaver} className="w-[60px] h-[60px] mx-4" />
      </div>

      {/* 토스트 */}
      {toast && (
        <CommonToast
          type={toast}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
}