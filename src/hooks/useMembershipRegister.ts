/**
 * useMembershipRegister Hook
 * 멤버십 등록 로직을 캡슐화한 재사용 가능 커스텀 훅
 * 사용처: 온보딩 InputPage, 멤버십 InputNumberPage, 홈 바텀시트 등
 */
import { useCallback, useState } from 'react';
import { membershipApi } from '../api/membership';

interface RegisterResult {
    userMembershipBrandId: number;
    membershipNumber: string;
}

interface UseMembershipRegisterOptions {
    onSuccess?: (result: RegisterResult) => void;
    onError?: (errorMessage: string) => void;
}

interface UseMembershipRegisterReturn {
    register: (membershipBrandId: number, membershipNumber: string) => Promise<RegisterResult | null>;
    isLoading: boolean;
    error: string | null;
    clearError: () => void;
}

export const useMembershipRegister = (
    options?: UseMembershipRegisterOptions
): UseMembershipRegisterReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = useCallback(
        async (
            membershipBrandId: number,
            membershipNumber: string
        ): Promise<RegisterResult | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await membershipApi.registerUserMembership(
                    membershipBrandId,
                    membershipNumber
                );

                if (response.isSuccess && response.result) {
                    options?.onSuccess?.(response.result);
                    return response.result;
                } else {
                    const errorMsg = response.message || '멤버십 등록에 실패했습니다.';
                    setError(errorMsg);
                    options?.onError?.(errorMsg);
                    return null;
                }
            } catch (err) {
                const errorMsg =
                    err instanceof Error
                        ? err.message
                        : '멤버십 등록 중 오류가 발생했습니다.';
                setError(errorMsg);
                options?.onError?.(errorMsg);
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [options]
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { register, isLoading, error, clearError };
};
