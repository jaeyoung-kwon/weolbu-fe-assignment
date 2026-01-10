import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth.api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      alert(`로그인 성공! 환영합니다, ${data.user.name}님!`);
      console.log('Login response:', data);
    },
    onError: (error) => {
      alert(`로그인 실패: ${error.message}`);
      console.error('Login error:', error);
    },
  });
};
