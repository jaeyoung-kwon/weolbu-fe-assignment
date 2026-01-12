import { signup } from '@/shared/apis/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onError: (error) => {
      alert(`회원가입 실패: ${error.message}`);
      console.error('Signup error:', error);
    },
  });
};
