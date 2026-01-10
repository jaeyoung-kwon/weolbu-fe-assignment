import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/auth.api';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      alert(`회원가입 성공! 환영합니다, ${data.name}님!`);
      console.log('Signup response:', data);
    },
    onError: (error) => {
      alert(`회원가입 실패: ${error.message}`);
      console.error('Signup error:', error);
    },
  });
};
