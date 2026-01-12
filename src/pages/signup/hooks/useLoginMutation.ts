import { login } from '@/shared/apis/auth';
import { useAuth } from '@/shared/contexts/auth';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.accessToken, data.tokenType, data.user);
    },
    onError: (error) => {
      alert(`로그인 실패: ${error.message}`);
      console.error('Login error:', error);
    },
  });
};
