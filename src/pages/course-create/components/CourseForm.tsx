import { Input } from '@/shared/components';
import styled from '@emotion/styled';
import type { ChangeEvent, FormEvent } from 'react';

interface CourseFormProps {
  form: {
    title: string;
    description: string;
    capacity: string;
    price: string;
  };
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (
    key: 'title' | 'description' | 'capacity' | 'price',
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const CourseForm = ({ form, onSubmit, onChange }: CourseFormProps) => {
  return (
    <Form id="course-form" onSubmit={onSubmit}>
      <Input
        label="강의명"
        placeholder="강의명을 입력하세요"
        value={form.title}
        onChange={onChange('title')}
        required
      />
      <Input
        label="강의 설명"
        placeholder="강의 설명을 입력하세요"
        value={form.description}
        onChange={onChange('description')}
        required
      />
      <Input
        label="수강인원"
        type="number"
        min={1}
        placeholder="수강 인원을 입력하세요"
        value={form.capacity}
        onChange={onChange('capacity')}
        required
      />
      <Input
        label="가격"
        type="number"
        min={0}
        placeholder="가격을 입력하세요"
        value={form.price}
        onChange={onChange('price')}
        required
      />
    </Form>
  );
};

export default CourseForm;

const Form = styled.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;
