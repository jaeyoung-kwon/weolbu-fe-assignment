import { useMutation, useQueryClient } from '@tanstack/react-query';
import { courseQuery, postCourse } from '@/shared/apis/course';

export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQuery.all().queryKey,
      });
    },
  });
};
