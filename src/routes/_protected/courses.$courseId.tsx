import CourseDetailInfo from '@/pages/course-detail/components/CourseDetailInfo';
import CourseDetailTitle from '@/pages/course-detail/components/CourseDetailTitle';
import { courseQuery } from '@/shared/apis/course';
import { Button, Header, PageLayout } from '@/shared/components';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/courses/$courseId')({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const { data: course } = useSuspenseQuery(courseQuery.detail(courseId));

  return (
    <PageLayout hasFooter>
      <Header
        left={
          <BackButton
            variant="transparent"
            onClick={() => navigate({ to: '/' })}
          >
            ← 뒤로
          </BackButton>
        }
      />

      <CourseDetailTitle
        title={course.title}
        instructorName={course.instructorName}
        description={course.description}
      />

      <CourseDetailInfo
        price={course.price}
        currentStudents={course.currentStudents}
        maxStudents={course.maxStudents}
        availableSeats={course.availableSeats}
        createdAt={course.createdAt}
      />
    </PageLayout>
  );
}

const BackButton = styled(Button)``;
