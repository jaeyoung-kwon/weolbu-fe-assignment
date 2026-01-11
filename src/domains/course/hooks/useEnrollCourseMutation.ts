import { useMutation } from '@tanstack/react-query';
import { postEnrollments } from '@/domains/course/api/course.api';

export const useEnrollCourseMutation = () => {
  return useMutation({
    mutationFn: postEnrollments,
  });
};
