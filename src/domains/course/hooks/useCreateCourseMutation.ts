import { useMutation } from '@tanstack/react-query';
import { postCourse } from '@/domains/course/api/course.api';

export const useCreateCourseMutation = () => {
  return useMutation({
    mutationFn: postCourse,
  });
};
