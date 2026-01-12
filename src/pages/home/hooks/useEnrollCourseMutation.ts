import { useMutation } from '@tanstack/react-query';
import { postEnrollments } from '@/shared/apis/course';

export const useEnrollCourseMutation = () => {
  return useMutation({
    mutationFn: postEnrollments,
  });
};
