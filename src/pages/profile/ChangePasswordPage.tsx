import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';

/**
 * [PAGE] 비밀번호 변경 페이지
 */
export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // 포커스 벗어났는지 여부
  const [touched, setTouched] = useState({
    currentPw: false,
    newPw: false,
    confirmPw: false,
  });

  const [errors, setErrors] = useState({
    currentPw: '',
    newPw: '',
    confirmPw: '',
  });

  // 🔐 비밀번호 조건
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,12}$/;

  /** 🔍 필드별 검증 */
  const validateField = (field: keyof typeof errors) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (field === 'currentPw') {
        /**
         * TODO:
         * 🔐 현재 비밀번호 검증은 실제로는 API 호출로 처리해야 함
         * ex) await checkCurrentPassword(currentPw)
         */
        if (currentPw && currentPw !== '기존비밀번호') {
          newErrors.currentPw = '현재 비밀번호와 일치하지 않습니다';
        } else {
          newErrors.currentPw = '';
        }
      }

      if (field === 'newPw') {
        if (newPw && !passwordRegex.test(newPw)) {
          newErrors.newPw = '8~12자 영문 + 특수문자 조합으로 입력해주세요';
        } else {
          newErrors.newPw = '';
        }
      }

      if (field === 'confirmPw') {
        if (confirmPw && newPw !== confirmPw) {
          newErrors.confirmPw = '입력하신 비밀번호와 일치하지 않습니다';
        } else {
          newErrors.confirmPw = '';
        }
      }

      return newErrors;
    });
  };

  /** ✅ 최종 유효성 */
  const isValid =
    currentPw &&
    newPw &&
    confirmPw &&
    !errors.currentPw &&
    !errors.newPw &&
    !errors.confirmPw;

  const inputBase =
    'w-full pb-2 text-[16px] font-normal focus:outline-none';

  const getBorderColor = (error: string, isTouched: boolean) =>
    error && isTouched
      ? 'border-red-500'
      : 'focus-within:border-[#00C0E8] border-gray-300';

  const handleSubmit = () => {
    //if (!isValid) return;

    console.log('비밀번호 변경 완료');
    navigate('/profile/edit', { state: {toast: 'password'} });
  };

  return (
    <Layout>
      {/* 헤더 */}
      <div className="w-full h-[128px] relative flex items-end border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[16px] pb-4 p-2 rounded-full hover:cursor-pointer"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="w-full text-center text-[20px] font-semibold pb-4">
          비밀번호 변경
        </h1>
      </div>

      {/* 입력 영역 */}
      <div className="mt-[38px] flex flex-col space-y-[38px]">
        {/* 현재 비밀번호 */}
        <div className="px-[25px]">
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            onBlur={() => {
              setTouched((p) => ({ ...p, currentPw: true }));
              validateField('currentPw');
            }}
            className={`${inputBase} text-gray-800`}
          />
          <div
            className={`border-b ${getBorderColor(
              errors.currentPw,
              touched.currentPw
            )}`}
          />
          {touched.currentPw && errors.currentPw && (
            <p className="mt-1 text-right text-[12px] text-red-500">
              {errors.currentPw}
            </p>
          )}
        </div>

        {/* 새 비밀번호 */}
        <div className="px-[25px]">
          <input
            type="password"
            placeholder="새 비밀번호 (8~12자 영문+특수문자)"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            onBlur={() => {
              setTouched((p) => ({ ...p, newPw: true }));
              validateField('newPw');
            }}
            className={`${inputBase} text-gray-800`}
          />
          <div
            className={`border-b ${getBorderColor(
              errors.newPw,
              touched.newPw
            )}`}
          />
          {touched.newPw && errors.newPw && (
            <p className="mt-1 text-right text-[12px] text-red-500">
              {errors.newPw}
            </p>
          )}
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="px-[25px]">
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            onBlur={() => {
              setTouched((p) => ({ ...p, confirmPw: true }));
              validateField('confirmPw');
            }}
            className={`${inputBase} text-gray-800`}
          />
          <div
            className={`border-b ${getBorderColor(
              errors.confirmPw,
              touched.confirmPw
            )}`}
          />
          {touched.confirmPw && errors.confirmPw && (
            <p className="mt-1 text-right text-[12px] text-[#ff2d55]">
              {errors.confirmPw}
            </p>
          )}
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        onClick={handleSubmit}
        //disabled={!isValid}
        className={`
          fixed bottom-10
          left-1/2 -translate-x-1/2
          w-[343px] h-[54px]
          rounded-full
          font-semibold text-[16px]
          flex justify-center items-center
          transition-colors
          ${
            isValid
              ? 'bg-[#00C0E8] text-white cursor-pointer hover:bg-[#00B3D8]'
              : 'bg-gray-300 text-white cursor-not-allowed'
          }
        `}
      >
        완료하기
      </button>
    </Layout>
  );
}
