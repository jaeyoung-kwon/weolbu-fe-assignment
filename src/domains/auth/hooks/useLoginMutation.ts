import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth.api';
import { useAuth } from '../contexts/AuthContext';

export const useLoginMutation = () => {
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // TODO: 로그인 성공 후 처리 (예: 본 페이지로 리다이렉트)
      setAuth(data.accessToken, data.user);
    },
    onError: (error) => {
      // TODO: 에러 핸들링 개선 필요
      alert(`로그인 실패: ${error.message}`);
      console.error('Login error:', error);
    },
  });
};
