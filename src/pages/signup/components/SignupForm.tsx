import { Input, Radio, Text } from '@/shared/components';
import styled from '@emotion/styled';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';

type SignupFormProps = {
  form: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'student' | 'instructor';
  };
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  };
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (
    key: 'name' | 'email' | 'phone' | 'password' | 'role',
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    key: 'name' | 'email' | 'phone' | 'password' | 'role',
  ) => (event: FocusEvent<HTMLInputElement>) => void;
};

const SignupForm = ({
  form,
  errors,
  onSubmit,
  onChange,
  onBlur,
}: SignupFormProps) => {
  return (
    <Form id="signup-form" onSubmit={onSubmit}>
      <FieldGroup delay={60}>
        <Input
          label="이름"
          value={form.name}
          onChange={onChange('name')}
          onBlur={onBlur('name')}
          error={errors.name}
        />
      </FieldGroup>
      <FieldGroup delay={110}>
        <Input
          label="이메일"
          type="email"
          value={form.email}
          onChange={onChange('email')}
          onBlur={onBlur('email')}
          error={errors.email}
        />
      </FieldGroup>
      <FieldGroup delay={160}>
        <Input
          label="휴대폰 번호"
          type="tel"
          value={form.phone}
          onChange={onChange('phone')}
          onBlur={onBlur('phone')}
          error={errors.phone}
        />
      </FieldGroup>
      <FieldGroup delay={210}>
        <Input
          label="비밀번호"
          type="password"
          value={form.password}
          onChange={onChange('password')}
          onBlur={onBlur('password')}
          error={errors.password}
        />
      </FieldGroup>
      <FieldGroup delay={260}>
        <Text size="sm" weight="medium">
          회원 유형
        </Text>
        <RadioGroup>
          <Radio
            label="수강생"
            name="role"
            value="student"
            checked={form.role === 'student'}
            onChange={onChange('role')}
          />
          <Radio
            label="강사"
            name="role"
            value="instructor"
            checked={form.role === 'instructor'}
            onChange={onChange('role')}
          />
        </RadioGroup>
      </FieldGroup>
    </Form>
  );
};

export default SignupForm;

const Form = styled.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const FieldGroup = styled.div<{ delay: number }>`
  display: flex;
  gap: 12px;
  flex-direction: column;

  animation: fade-in 0.4s ease-out;

  animation-delay: ${({ delay }) => delay}ms;
  animation-fill-mode: both;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
`;
