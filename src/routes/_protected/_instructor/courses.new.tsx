import CourseForm from '@/pages/course-create/components/CourseForm';
import { useCourseForm } from '@/pages/course-create/hooks/useCourseForm';
import { useCreateCourseMutation } from '@/pages/course-create/hooks/useCreateCourseMutation';
import { Button, Footer, Header, PageLayout } from '@/shared/components';
import { useAuth } from '@/shared/contexts/auth';
import styled from '@emotion/styled';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { FormEvent } from 'react';

export const Route = createFileRoute('/_protected/_instructor/courses/new')({
  component: CourseNewPage,
});

function CourseNewPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { form, handleChange, resetForm } = useCourseForm();
  const { mutate: createCourse, isPending } = useCreateCourseMutation();

  const handleGoBack = () => {
    navigate({ to: '/' });
    resetForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createCourse(
      {
        title: form.title,
        description: form.description,
        instructorName: user?.name ?? '',
        maxStudents: Number(form.capacity),
        price: Number(form.price),
      },
      {
        onSuccess: () => {
          navigate({ to: '/' });
          resetForm();
        },
      },
    );
  };

  return (
    <PageLayout hasFooter>
      <Header
        title="강의 등록"
        left={
          <BackButton variant="transparent" onClick={handleGoBack}>
            ← 뒤로
          </BackButton>
        }
      />

      <Content>
        <CourseForm
          form={form}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </Content>

      <Footer>
        <SubmitButton type="submit" form="course-form" disabled={isPending}>
          {isPending ? '등록 중...' : '등록하기'}
        </SubmitButton>
      </Footer>
    </PageLayout>
  );
}

const BackButton = styled(Button)``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;
