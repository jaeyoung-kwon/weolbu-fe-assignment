import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/auth.api';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onError: (error) => {
      alert(`회원가입 실패: ${error.message}`);
      console.error('Signup error:', error);
    },
  });
};
