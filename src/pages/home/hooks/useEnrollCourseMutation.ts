import { useMutation, useQueryClient } from '@tanstack/react-query';
import { courseQuery, postEnrollments } from '@/shared/apis/course';

export const useEnrollCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEnrollments,
    onSuccess: (response) => {
      const successCount = response.success.length;
      const failedCount = response.failed.length;

      let message = '';
      if (successCount > 0) {
        message += `${successCount}개의 강의 신청에 성공했습니다.`;
      }
      if (failedCount > 0) {
        message += `\n\n${failedCount}개의 강의 신청에 실패했습니다:\n`;
        response.failed.forEach((failure) => {
          message += `- ${failure.reason}\n`;
        });
      }

      alert(message);
      queryClient.invalidateQueries({
        queryKey: courseQuery.all().queryKey,
      });
    },
    onError: (error) => {
      alert('수강 신청 중 오류가 발생했습니다.');
      console.error('Enrollment error:', error);
    },
  });
};
