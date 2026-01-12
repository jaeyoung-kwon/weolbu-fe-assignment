import { useMutation } from '@tanstack/react-query';
import { postCourse } from '@/shared/apis/course';

export const useCreateCourseMutation = () => {
  return useMutation({
    mutationFn: postCourse,
  });
};
