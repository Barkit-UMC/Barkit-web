import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * [PAGE 3] 회원가입 페이지
 * - iPhone 14 Pro 기준 390px x 852px
 * - 이메일 형식 검증, 비밀번호 유효성, 약관 동의 기능 포함
 */
export default function SignupPage() {
    const navigate = useNavigate();

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');

    // Validation states
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [emailCheckResult, setEmailCheckResult] = useState<'valid' | 'invalid' | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    // Terms agreement states
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);

    // Submit button enabled state
    const [isFormValid, setIsFormValid] = useState(false);

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password regex: 8-12 characters, must include letters and special characters
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/;

    // Handle email check button click
    const handleEmailCheck = () => {
        if (emailRegex.test(email)) {
            setEmailCheckResult('valid');
            setIsEmailChecked(true);
        } else {
            setEmailCheckResult('invalid');
            setIsEmailChecked(false);
        }
    };

    // Reset email check when email changes
    useEffect(() => {
        setIsEmailChecked(false);
        setEmailCheckResult(null);
    }, [email]);

    // Validate password on change
    useEffect(() => {
        if (password.length === 0) {
            setPasswordError(null);
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호 형식에 맞지 않습니다');
        } else {
            setPasswordError(null);
        }
    }, [password]);

    // Validate password confirmation
    useEffect(() => {
        if (confirmPassword.length === 0) {
            setConfirmPasswordError(null);
            setIsPasswordMatch(false);
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 올바르지 않습니다');
            setIsPasswordMatch(false);
        } else {
            setConfirmPasswordError(null);
            setIsPasswordMatch(true);
        }
    }, [password, confirmPassword]);

    // Handle "Agree All" checkbox
    const handleAgreeAll = (checked: boolean) => {
        setAgreeAll(checked);
        setAgreeTerms(checked);
        setAgreePrivacy(checked);
        setAgreeMarketing(checked);
    };

    // Handle individual checkbox changes
    useEffect(() => {
        if (agreeTerms && agreePrivacy && agreeMarketing) {
            setAgreeAll(true);
        } else {
            setAgreeAll(false);
        }
    }, [agreeTerms, agreePrivacy, agreeMarketing]);

    // Validate entire form
    useEffect(() => {
        const isNameValid = name.trim().length > 0;
        const isEmailValid = isEmailChecked && emailCheckResult === 'valid';
        const isPasswordValid = passwordRegex.test(password);
        const isConfirmValid = isPasswordMatch;
        const isBirthDateValid = birthDate.trim().length > 0;
        const isRequiredTermsAgreed = agreeTerms && agreePrivacy;

        setIsFormValid(
            isNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmValid &&
            isBirthDateValid &&
            isRequiredTermsAgreed
        );
    }, [
        name,
        isEmailChecked,
        emailCheckResult,
        password,
        isPasswordMatch,
        birthDate,
        agreeTerms,
        agreePrivacy
    ]);

    // Handle form submission
    const handleSubmit = () => {
        if (!isFormValid) return;
        console.log('Signup:', { name, email, password, birthDate });
        // TODO: API call for signup
        navigate('/login');
    };

    return (
        <div className="w-[390px] min-h-[852px] mx-auto bg-white flex flex-col">
            {/* Header */}
            <header className="relative flex items-center justify-center h-18 border-b border-gray-100 mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="뒤로가기"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-semibold">회원가입</h1>
            </header>

            {/* Form Container */}
            <div className="flex-1 flex flex-col px-6 pt-6 pb-4 gap-1">
                {/* Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full py-3 border-b border-gray-200 text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                </div>

                {/* Email Input with Check Button */}
                <div className="mb-1">
                    <div className="flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="아이디 ( 이메일 주소 )"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`flex-1 py-3 border-b text-base placeholder:text-gray-400 focus:outline-none ${emailCheckResult === 'invalid' ? 'border-[#EF4444]' : 'border-gray-200 focus:border-gray-400'
                                }`}
                        />
                        <button
                            onClick={handleEmailCheck}
                            disabled={email.length === 0}
                            className={`px-3 py-2 text-sm font-medium rounded-none whitespace-nowrap transition-colors ${email.length > 0
                                ? 'bg-[#00BCD4] text-white hover:bg-[#00ACC1]'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            중복 확인
                        </button>
                    </div>
                    {/* Email validation message */}
                    <div className="h-5 mt-1 text-right">
                        {emailCheckResult === 'valid' && (
                            <span className="text-sm text-green-500">사용 가능한 아이디입니다.</span>
                        )}
                        {emailCheckResult === 'invalid' && (
                            <span className="text-sm text-red-500">사용 불가능한 아이디입니다</span>
                        )}
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-1">
                    <input
                        type="password"
                        placeholder="비밀번호 (8~12자 · 영문 + 특수문자 조합)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full py-3 border-b text-base placeholder:text-gray-400 focus:outline-none ${passwordError ? 'border-red-300' : 'border-gray-200 focus:border-gray-400'
                            }`}
                    />
                    <div className="h-5 mt-1 text-right">
                        {passwordError && (
                            <span className="text-sm text-red-500">{passwordError}</span>
                        )}
                    </div>
                </div>

                {/* Confirm Password Input */}
                <div className="mb-1">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full py-3 border-b text-base placeholder:text-gray-400 focus:outline-none ${confirmPasswordError ? 'border-red-300' : 'border-gray-200 focus:border-gray-400'
                                }`}
                        />
                        {/* Check mark icon when passwords match */}
                        {isPasswordMatch && confirmPassword.length > 0 && (
                            <svg
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCD4]"
                                fill="none"
                                stroke="#34C759"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <div className="h-5 mt-1 text-right">
                        {confirmPasswordError && (
                            <span className="text-sm text-red-500">{confirmPasswordError}</span>
                        )}
                    </div>
                </div>

                {/* Birth Date Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="생년월일"
                        value={birthDate}
                        onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            if (value.length <= 8) {
                                setBirthDate(value);
                            }
                        }}
                        maxLength={8}
                        className="w-full py-3 border-b border-gray-200 text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                </div>

                {/* Terms Agreement Section */}
                <div className="bg-[#F7FDFE] rounded-xl p-4 mb-6">
                    {/* Agree All */}
                    <label className="flex items-center gap-3 mb-4 cursor-pointer">
                        <div
                            className={`w-5 h-5 rounded flex items-center justify-center ${agreeAll ? 'bg-[#34C759]' : 'bg-gray-200'
                                }`}
                            onClick={() => handleAgreeAll(!agreeAll)}
                        >
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="font-semibold text-base">약관 전체동의</span>
                    </label>

                    <div className="border-t border-gray-200 pt-3 space-y-5">
                        {/* Terms of Service */}
                        <label className="flex items-center gap-4 cursor-pointer mt-3">
                            <div
                                className={`w-4 h-4 rounded flex items-center justify-center ${agreeTerms ? 'bg-[#34C759]' : 'bg-gray-200'
                                    }`}
                                onClick={() => setAgreeTerms(!agreeTerms)}
                            >
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">이용약관에 동의합니다. (필수)</span>
                        </label>

                        {/* Privacy Policy */}
                        <label className="flex items-center gap-4 cursor-pointer">
                            <div
                                className={`w-4 h-4 rounded flex items-center justify-center ${agreePrivacy ? 'bg-[#34C759]' : 'bg-gray-200'
                                    }`}
                                onClick={() => setAgreePrivacy(!agreePrivacy)}
                            >
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">개인정보 수집 및 이용에 동의합니다. (필수)</span>
                        </label>

                        {/* Marketing */}
                        <label className="flex items-center gap-4 cursor-pointer">
                            <div
                                className={`w-4 h-4 rounded flex items-center justify-center ${agreeMarketing ? 'bg-[#34C759]' : 'bg-gray-200'
                                    }`}
                                onClick={() => setAgreeMarketing(!agreeMarketing)}
                            >
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">개인정보 마케팅 활용에 동의합니다. (선택)</span>
                        </label>
                    </div>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded-full text-white font-bold text-lg transition-colors mb-8 ${isFormValid
                        ? 'bg-[#00BCD4] hover:bg-[#00ACC1]'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
