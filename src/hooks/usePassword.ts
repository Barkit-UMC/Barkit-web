import { useState, useCallback } from "react";
import { userApi, type UpdatePasswordRequest } from "../api/user";

export default function usePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = useCallback(
    async (data: UpdatePasswordRequest): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await userApi.updatePassword(data);
        return true; // 성공
      } catch (err: any) {
        setError(err?.message || "비밀번호 변경 실패");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { changePassword, isLoading, error, clearError };
}
