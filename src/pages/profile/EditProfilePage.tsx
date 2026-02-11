import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import iconNaver from '../../assets/icons/sns/naver.svg';
import iconKakao from '../../assets/icons/sns/kakaotalk.svg';
import CommonToast from '../../components/profile/CommonToast';
import Header from '../../components/common/Header';
import { userApi } from '../../api/user';
import { authApi } from '../../api/auth';

type LocationState = {
  toast?: 'password' | 'connect_kakao' | 'connect_naver' | 'connect_fail' | 'connect_already';
  provider?: 'kakao' | 'naver';
  errorMessage?: string;
};

/**
 * [PAGE 20] 내 정보 수정 페이지
 */
export default function EditProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: API에서 사용자 정보 가져오기
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    userApi.getMyInfo().then((userInfo) => {
      if (userInfo) {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    });
  }, []);

  // 토스트 상태
  const [toast, setToast] = useState<LocationState['toast'] | null>(null);

  useEffect(() => {
    const state = location.state as LocationState | null;

    if (state?.toast) {
      // 이미 연동된 경우 팝업 표시
      if (state.toast === 'connect_already') {
        alert(state.errorMessage || '이미 연동된 계정입니다.');
        // 팝업 후 토스트는 띄우지 않음 (혹은 실패 토스트 띄울 수도 있음)
      } else {
        setToast(state.toast);
      }

      // state 제거 (뒤로가기 / 새로고침 중복 방지)
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // 카카오 연동 시작
  const handleKakaoConnect = () => {
    const kakaoClientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
    // .env 수정 불가 -> 기존 로그인용 Redirect URI 사용 (사용자가 원하는 동작)
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2, 15);

    // 중요: KakaoCallbackPage에서 검증할 state와 모드 매핑
    sessionStorage.setItem('kakao_oauth_state', state);
    localStorage.setItem('auth_mode', 'connect');

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
    window.location.href = kakaoAuthUrl;
  };

  // 네이버 연동 시작
  const handleNaverConnect = async () => {
    try {
      // 모드 저장
      localStorage.setItem('auth_mode', 'connect');

      const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
      const naverAuthUrl = await authApi.getNaverAuthorizeUrl(redirectUri);
      window.location.href = naverAuthUrl;
    } catch (err) {
      console.error('Naver connect url error:', err);
      localStorage.removeItem('auth_mode'); // 실패 시 정리
      alert('네이버 연동 시작 중 오류가 발생했습니다.');
    }
  };

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

      <div className="px-[25px] pt-6 flex items-center gap-3">
        <span className="border-b border-gray-300 flex-1" />
        <h2 className="text-[16px] font-medium text-gray-300">연동하기</h2>
        <span className="border-b border-gray-300 flex-1" />
      </div>
      <div className="mt-6 mb-12 flex justify-center">
        <button onClick={handleKakaoConnect} className="mx-4 transition-transform active:scale-95">
          <img src={iconKakao} className="w-[60px] h-[60px]" alt="카카오 연동" />
        </button>
        <button onClick={handleNaverConnect} className="mx-4 transition-transform active:scale-95">
          <img src={iconNaver} className="w-[60px] h-[60px]" alt="네이버 연동" />
        </button>
      </div>

      {/* 토스트 */}
      {toast && toast !== 'connect_already' && (
        <CommonToast
          type={toast as any}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
}