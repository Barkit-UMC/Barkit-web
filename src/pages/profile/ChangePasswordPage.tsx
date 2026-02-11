import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import IconComplete from '../../assets/icons/toast/complete.svg';
import usePassword from '../../hooks/usePassword';

/**
 * [PAGE] 비밀번호 변경 페이지
 */
export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { changePassword, isLoading, error: serverError } = usePassword();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

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

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,12}$/;

  const validateField = (field: keyof typeof errors, value?: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      // ✅ 현재 비밀번호는 클라이언트에서 체크하지 않고 서버 에러 활용
      if (field === 'currentPw') {
        newErrors.currentPw = '';
      }

      if (field === 'newPw') {
        const pw = value ?? newPw;
        if (!pw) newErrors.newPw = '';
        else if (!passwordRegex.test(pw))
          newErrors.newPw = '8~12자 영문 + 특수문자 조합으로 입력해주세요';
        else newErrors.newPw = '';

        if (confirmPw && pw !== confirmPw)
          newErrors.confirmPw = '입력하신 비밀번호와 일치하지 않습니다';
        else newErrors.confirmPw = '';
      }

      if (field === 'confirmPw') {
        const pw = value ?? confirmPw;
        if (!pw) newErrors.confirmPw = '';
        else if (pw !== newPw)
          newErrors.confirmPw = '입력하신 비밀번호와 일치하지 않습니다';
        else newErrors.confirmPw = '';
      }

      return newErrors;
    });
  };

  /** 유효하면 체크 표시 (touched 된 후만 표시) */
  const isFieldValid = (
    field: keyof typeof errors,
    value: string,
    error: string,
    isTouched: boolean
  ) => value.length > 0 && !error && isTouched;

  const isValid =
    currentPw &&
    newPw &&
    confirmPw &&
    !errors.currentPw &&
    !errors.newPw &&
    !errors.confirmPw;

  const inputBase =
    'w-full pb-2 pr-10 text-[16px] font-normal focus:outline-none';

  const getBorderColor = (error: string, isTouched: boolean) =>
    error && isTouched
      ? 'border-red-500'
      : 'focus-within:border-[#00C0E8] border-gray-300';

  const handleSubmit = async () => {
    try {
      const success = await changePassword({
        currentPassword: currentPw,
        newPassword: newPw,
        confirmNewPassword: confirmPw,
      });

      if (success) {
        navigate('/profile/edit', { state: { toast: 'password' } });
      }
    } catch (err) {
      // 서버에서 반환된 에러를 currentPw 필드에 표시
      setErrors((prev) => ({ ...prev, currentPw: (err as Error).message }));
    }
  };

  return (
    <Layout>
      <Header title="비밀번호 변경" />

      <div className="mt-24 flex flex-col space-y-[38px]">
        {/* 현재 비밀번호 */}
        <div className="px-[25px]">
          <div className="relative">
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPw}
              onChange={(e) => {
                const v = e.target.value;
                setCurrentPw(v);
                validateField('currentPw', v);
              }}
              onBlur={() => setTouched((p) => ({ ...p, currentPw: true }))}
              className={`${inputBase} text-gray-800`}
            />
            {isFieldValid(
              'currentPw',
              currentPw,
              errors.currentPw,
              touched.currentPw
            ) && (
              <img
                src={IconComplete}
                alt="complete"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            )}
          </div>

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
          <div className="relative">
            <input
              type="password"
              placeholder="새 비밀번호 (8~12자 영문+특수문자)"
              value={newPw}
              onChange={(e) => {
                const v = e.target.value;
                setNewPw(v);
                validateField('newPw', v);
              }}
              onBlur={() => setTouched((p) => ({ ...p, newPw: true }))}
              className={`${inputBase} text-gray-800`}
            />
            {isFieldValid('newPw', newPw, errors.newPw, touched.newPw) && (
              <img
                src={IconComplete}
                alt="complete"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            )}
          </div>

          <div
            className={`border-b ${getBorderColor(errors.newPw, touched.newPw)}`}
          />
          {touched.newPw && errors.newPw && (
            <p className="mt-1 text-right text-[12px] text-red-500">
              {errors.newPw}
            </p>
          )}
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="px-[25px]">
          <div className="relative">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPw}
              onChange={(e) => {
                const v = e.target.value;
                setConfirmPw(v);
                validateField('confirmPw', v);
              }}
              onBlur={() => setTouched((p) => ({ ...p, confirmPw: true }))}
              className={`${inputBase} text-gray-800`}
            />
            {isFieldValid(
              'confirmPw',
              confirmPw,
              errors.confirmPw,
              touched.confirmPw
            ) && (
              <img
                src={IconComplete}
                alt="complete"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            )}
          </div>

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

      <div className="fixed bottom-10 left-0 right-0 px-6">
        <Button
          onClick={handleSubmit}
          variant="secondary"
          disabled={!isValid || isLoading}
        >
          완료하기
        </Button>
      </div>
    </Layout>
  );
}
