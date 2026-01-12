import CourseForm from '@/pages/course-create/components/CourseForm';
import { useCourseForm } from '@/pages/course-create/hooks/useCourseForm';
import { useCreateCourseMutation } from '@/pages/course-create/hooks/useCreateCourseMutation';
import { parsePriceValue } from '@/pages/course-create/utils/parser';
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
  const { form, errors, handleChange, handleBlur, validateForm, resetForm } =
    useCourseForm();
  const { mutate: createCourse, isPending } = useCreateCourseMutation();

  const handleGoBack = () => {
    navigate({ to: '/' });
    resetForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    createCourse(
      {
        title: form.title,
        description: form.description,
        instructorName: user?.name ?? '',
        maxStudents: Number(form.capacity),
        price: parsePriceValue(form.price),
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
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Content>

      <Footer>
        <SubmitButton
          type="submit"
          form="course-form"
          disabled={isPending || Object.keys(errors).length > 0}
        >
          {isPending ? '등록 중...' : '등록하기'}
        </SubmitButton>
      </Footer>
    </PageLayout>
  );
}

const BackButton = styled(Button)``;

const Content = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;
