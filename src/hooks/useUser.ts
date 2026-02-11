import { useState, useEffect, useCallback } from 'react';
import { userApi, type UserResponse } from '../api/user';

export default function useUser() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await userApi.getMyInfo();
      setUser(data);
    } catch (err) {
      setError('사용자 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refreshUser: fetchUser };
}
