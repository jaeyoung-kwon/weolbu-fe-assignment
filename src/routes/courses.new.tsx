import { useCreateCourseMutation } from '@/pages/course-create/hooks/useCreateCourseMutation';
import { Button, Header, Input } from '@/shared/components';
import { useAuth } from '@/shared/contexts/auth';
import styled from '@emotion/styled';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

export const Route = createFileRoute('/courses/new')({
  component: CourseNewPage,
});

function CourseNewPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: createCourse, isPending } = useCreateCourseMutation();
  const [form, setForm] = useState({
    title: '',
    description: '',
    capacity: '',
    price: '',
  });

  const handleGoBack = () => {
    navigate({ to: '/' });
  };

  const handleChange =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createCourse({
      title: form.title,
      description: form.description,
      instructorName: user?.name ?? '',
      maxStudents: Number(form.capacity),
      price: Number(form.price),
    });
  };

  return (
    <>
      <Header
        title="강의 등록"
        left={
          <BackButton variant="transparent" onClick={handleGoBack}>
            ← 뒤로
          </BackButton>
        }
      />

      <Content>
        <Form onSubmit={handleSubmit}>
          <Fields>
            <Input
              label="강의명"
              placeholder="강의명을 입력하세요"
              value={form.title}
              onChange={handleChange('title')}
              required
            />
            <Input
              label="강의 설명"
              placeholder="강의 설명을 입력하세요"
              value={form.description}
              onChange={handleChange('description')}
              required
            />
            <Input
              label="수강인원"
              type="number"
              min={1}
              placeholder="수강 인원을 입력하세요"
              value={form.capacity}
              onChange={handleChange('capacity')}
              required
            />
            <Input
              label="가격"
              type="number"
              min={0}
              placeholder="가격을 입력하세요"
              value={form.price}
              onChange={handleChange('price')}
              required
            />
          </Fields>
          <Footer>
            <SubmitButton type="submit" disabled={isPending}>
              {isPending ? '등록 중...' : '등록하기'}
            </SubmitButton>
          </Footer>
        </Form>
      </Content>
    </>
  );
}

const BackButton = styled(Button)``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;
  padding: 16px 0 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 16px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;
