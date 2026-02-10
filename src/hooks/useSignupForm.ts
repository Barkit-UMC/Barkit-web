import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';

// 정규식 패턴
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/;

export interface UseSignupFormReturn {
    // Form fields
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
    birthDate: string;
    setBirthDate: (value: string) => void;

    // Validation states
    isEmailChecked: boolean;
    emailCheckResult: 'valid' | 'invalid' | null;
    passwordError: string | null;
    confirmPasswordError: string | null;
    isPasswordMatch: boolean;

    // Terms agreement states
    agreeAll: boolean;
    agreeTerms: boolean;
    agreePrivacy: boolean;
    agreeMarketing: boolean;

    // Handlers
    handleEmailCheck: () => void;
    handleAgreeAll: (checked: boolean) => void;
    setAgreeTerms: (checked: boolean) => void;
    setAgreePrivacy: (checked: boolean) => void;
    setAgreeMarketing: (checked: boolean) => void;

    // Form validation
    isFormValid: boolean;
}

/**
 * 회원가입 폼 상태 및 검증 로직을 관리하는 커스텀 훅
 */
export function useSignupForm(): UseSignupFormReturn {
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

    // Form validity
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle email check button click
    const handleEmailCheck = useCallback(async () => {
        if (!EMAIL_REGEX.test(email)) {
            setEmailCheckResult('invalid');
            setIsEmailChecked(false);
            return;
        }

        try {
            // 실제 API 호출로 중복 확인
            const response = await authApi.checkEmail(email);
            if (response.isSuccess && response.result) {
                if (response.result.isAvailable) {
                    setEmailCheckResult('valid');
                    setIsEmailChecked(true);
                } else {
                    setEmailCheckResult('invalid'); // 사용 불가능 (중복 등)
                    setIsEmailChecked(false);
                }
            } else {
                setEmailCheckResult('invalid');
                setIsEmailChecked(false);
            }
        } catch (error) {
            console.error('Email check failed:', error);
            setEmailCheckResult('invalid');
            setIsEmailChecked(false);
        }
    }, [email]);

    // Handle "Agree All" checkbox
    const handleAgreeAll = useCallback((checked: boolean) => {
        setAgreeAll(checked);
        setAgreeTerms(checked);
        setAgreePrivacy(checked);
        setAgreeMarketing(checked);
    }, []);

    // Reset email check when email changes
    useEffect(() => {
        setIsEmailChecked(false);
        setEmailCheckResult(null);
    }, [email]);

    // Validate password on change
    useEffect(() => {
        if (password.length === 0) {
            setPasswordError(null);
        } else if (!PASSWORD_REGEX.test(password)) {
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

    // Sync agreeAll when individual checkboxes change
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
        const isPasswordValid = PASSWORD_REGEX.test(password);
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

    return {
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
        isEmailChecked,
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
    };
}
