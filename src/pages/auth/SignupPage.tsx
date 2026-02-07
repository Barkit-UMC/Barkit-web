import { useNavigate } from 'react-router-dom';
import { useSignupForm } from '../../hooks/useSignupForm';
import FormInput from '../../components/auth/FormInput';
import AgreementSection from '../../components/auth/AgreementSection';

/**
 * [PAGE 3] 회원가입 페이지
 * - iPhone 14 Pro 기준 390px x 852px
 * - 이메일 형식 검증, 비밀번호 유효성, 약관 동의 기능 포함
 */
export default function SignupPage() {
    const navigate = useNavigate();
    const {
        // Form fields
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        birthDate,
        setBirthDate,

        // Validation states
        emailCheckResult,
        passwordError,
        confirmPasswordError,
        isPasswordMatch,

        // Terms agreement states
        agreeAll,
        agreeTerms,
        agreePrivacy,
        agreeMarketing,

        // Handlers
        handleEmailCheck,
        handleAgreeAll,
        setAgreeTerms,
        setAgreePrivacy,
        setAgreeMarketing,

        // Form validation
        isFormValid,
    } = useSignupForm();

    // Handle form submission
    const handleSubmit = () => {
        if (!isFormValid) return;
        console.log('Signup:', { name, email, password, birthDate });
        // TODO: API call for signup
        navigate('/login');
    };

    // 중복 확인 버튼
    const emailCheckButton = (
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
    );

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
                <FormInput
                    type="email"
                    placeholder="아이디( 이메일 주소 )"
                    value={email}
                    onChange={setEmail}
                    hasError={emailCheckResult === 'invalid'}
                    error={emailCheckResult === 'invalid' ? '사용 불가능한 아이디입니다' : null}
                    successMessage={emailCheckResult === 'valid' ? '사용 가능한 아이디입니다.' : null}
                    rightElement={emailCheckButton}
                />

                {/* Password Input */}
                <FormInput
                    type="password"
                    placeholder="비밀번호(8~12자 · 영문 + 특수문자 조합)"
                    value={password}
                    onChange={setPassword}
                    error={passwordError}
                />

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
                        placeholder="생년월일(8자리)"
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
                <AgreementSection
                    agreeAll={agreeAll}
                    agreeTerms={agreeTerms}
                    agreePrivacy={agreePrivacy}
                    agreeMarketing={agreeMarketing}
                    onAgreeAllChange={handleAgreeAll}
                    onAgreeTermsChange={setAgreeTerms}
                    onAgreePrivacyChange={setAgreePrivacy}
                    onAgreeMarketingChange={setAgreeMarketing}
                />

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
