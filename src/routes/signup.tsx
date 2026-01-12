import LoginModal from '@/domains/auth/components/LoginModal';
import { useLoginMutation } from '@/domains/auth/hooks/useLoginMutation';
import { useSignupMutation } from '@/domains/auth/hooks/useSignupMutation';
import { Button, Input, Modal, Radio, Text } from '@/shared/components';
import styled from '@emotion/styled';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, type ChangeEvent, type FormEvent } from 'react';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'instructor' as 'student' | 'instructor',
  });

  const { mutate: login } = useLoginMutation();
  const { mutate: signup } = useSignupMutation();

  const handleChange =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signup(
      {
        email: form.email,
        password: form.password,
        name: form.name,
        phone: form.phone,
        role: form.role === 'instructor' ? 'INSTRUCTOR' : 'STUDENT',
      },
      {
        onSuccess: () => {
          login(
            {
              email: form.email,
              password: form.password,
            },
            {
              onSuccess: () => {
                navigate({ to: '/' });
              },
            },
          );
        },
      },
    );
  };

  return (
    <Modal>
      <FormCard onSubmit={handleSubmit}>
        <Header>
          <AccentBar />
          <Text as="h1" size="xl" weight="semibold">
            회원 가입
          </Text>
        </Header>

        <Fields>
          <FieldGroup delay={60}>
            <Input
              label="이름"
              value={form.name}
              onChange={handleChange('name')}
            />
          </FieldGroup>
          <FieldGroup delay={110}>
            <Input
              label="이메일"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />
          </FieldGroup>
          <FieldGroup delay={160}>
            <Input
              label="휴대폰 번호"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </FieldGroup>
          <FieldGroup delay={210}>
            <Input
              label="비밀번호"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
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
                onChange={handleChange('role')}
              />
              <Radio
                label="강사"
                name="role"
                value="instructor"
                checked={form.role === 'instructor'}
                onChange={handleChange('role')}
              />
            </RadioGroup>
          </FieldGroup>
        </Fields>

        <PrimaryButton type="submit">가입하기</PrimaryButton>

        <LoginSection>
          <Text size="sm" color="secondary">
            이미 회원이신가요?
          </Text>
          <Modal.OpenTrigger asChild>
            <LoginButton variant="outlined">로그인</LoginButton>
          </Modal.OpenTrigger>
        </LoginSection>
      </FormCard>
      <LoginModal />
    </Modal>
  );
}

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AccentBar = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.brand.primary},
    #8fa3ff
  );
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.4s ease-out;
  animation-delay: ${({ delay }) => delay}ms;
  animation-fill-mode: both;

  @keyframes fadeIn {
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

const PrimaryButton = styled(Button)`
  width: 100%;
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;

const LoginButton = styled(Button)``;
