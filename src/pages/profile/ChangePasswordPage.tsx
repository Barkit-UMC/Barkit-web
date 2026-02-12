import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import IconComplete from '../../assets/icons/toast/complete.svg';
import { userApi, type UpdatePasswordRequest } from '../../api/user';

function usePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async (data: UpdatePasswordRequest) => {
    setIsLoading(true);
    try {
      const result = await userApi.updatePassword(data);
      return result;
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || err.message;
      throw new Error(serverMessage || '비밀번호 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
}

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { changePassword, isLoading } = usePassword();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [errors, setErrors] = useState({
    currentPw: '',
    newPw: '',
    confirmPw: '',
  });

  const [currentPwValid, setCurrentPwValid] = useState(false);
  const [newPwValid, setNewPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,12}$/;

  // 1. 현재 비밀번호 실시간 검증 (Debounce)
  useEffect(() => {
    if (currentPw.length === 0) {
      setCurrentPwValid(false);
      setErrors(p => ({ ...p, currentPw: '' }));
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const isValid = await userApi.validatePassword(currentPw);
        if (isValid) {
          setCurrentPwValid(true);
          setErrors(p => ({ ...p, currentPw: '' }));
        } else {
          setCurrentPwValid(false);
          setErrors(p => ({ ...p, currentPw: '현재 비밀번호가 일치하지 않습니다.' }) );
        }
      } catch (err: any) {
        setCurrentPwValid(false);
        setErrors(p => ({ 
          ...p, 
          currentPw: err.response?.data?.message || '현재 비밀번호가 일치하지 않습니다.' 
        }));
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentPw]);

  // 2. 새 비밀번호 및 확인 실시간 검증 (Debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors(prev => {
        const nextErrors = { ...prev };
        
        // 새 비밀번호 검사
        if (newPw.length === 0) {
          nextErrors.newPw = '';
          setNewPwValid(false);
        } else if (!passwordRegex.test(newPw)) {
          nextErrors.newPw = '8~12자 영문 + 특수문자 조합으로 입력해주세요';
          setNewPwValid(false);
        } else {
          nextErrors.newPw = '';
          setNewPwValid(true);
        }

        // 비밀번호 확인 검사
        if (confirmPw.length === 0) {
          nextErrors.confirmPw = '';
          setConfirmPwValid(false);
        } else if (confirmPw !== newPw) {
          nextErrors.confirmPw = '입력하신 비밀번호와 일치하지 않습니다';
          setConfirmPwValid(false);
        } else {
          nextErrors.confirmPw = '';
          // 새 비밀번호 자체가 유효할 때만 확인 체크 표시
          setConfirmPwValid(passwordRegex.test(newPw));
        }

        return nextErrors;
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [newPw, confirmPw]);

  const isValid = currentPwValid && newPwValid && confirmPwValid;

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await changePassword({
        currentPassword: currentPw,
        newPassword: newPw,
        confirmPassword: confirmPw,
      });
      navigate('/profile/edit', { state: { toast: 'password' } });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const inputBase = 'w-full pb-2 pr-10 text-[16px] font-normal focus:outline-none bg-transparent';
  const getBorderColor = (error: string) =>
    error ? 'border-red-500' : 'focus-within:border-[#00C0E8] border-gray-300';

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
              onChange={(e) => setCurrentPw(e.target.value)}
              className={`${inputBase} text-gray-800`}
            />
            {currentPwValid && (
              <img src={IconComplete} alt="complete" className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4" />
            )}
          </div>
          <div className={`border-b ${getBorderColor(errors.currentPw)}`} />
          {errors.currentPw && <p className="mt-1 text-right text-[12px] text-red-500">{errors.currentPw}</p>}
        </div>

        {/* 새 비밀번호 */}
        <div className="px-[25px]">
          <div className="relative">
            <input
              type="password"
              placeholder="새 비밀번호 (8~12자 영문+특수문자)"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className={`${inputBase} text-gray-800`}
            />
            {newPwValid && (
              <img src={IconComplete} alt="complete" className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4" />
            )}
          </div>
          <div className={`border-b ${getBorderColor(errors.newPw)}`} />
          {errors.newPw && <p className="mt-1 text-right text-[12px] text-red-500">{errors.newPw}</p>}
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="px-[25px]">
          <div className="relative">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className={`${inputBase} text-gray-800`}
            />
            {confirmPwValid && (
              <img src={IconComplete} alt="complete" className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4" />
            )}
          </div>
          <div className={`border-b ${getBorderColor(errors.confirmPw)}`} />
          {errors.confirmPw && <p className="mt-1 text-right text-[12px] text-red-500">{errors.confirmPw}</p>}
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 px-6">
        <Button onClick={handleSubmit} variant="secondary" disabled={!isValid || isLoading}>
          {isLoading ? '변경 중...' : '완료하기'}
        </Button>
      </div>
    </Layout>
  );
}