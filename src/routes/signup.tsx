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
    <Page>
      <Modal>
        <FormCard onSubmit={handleSubmit}>
          <Header>
            <AccentBar />
            <Text as="h1" size="xl" weight="semibold">
              회원 가입
            </Text>
            <Text size="sm" color="secondary">
              몇 분이면 완료되는 간단한 가입 절차입니다.
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

          <Actions>
            <PrimaryButton type="submit">가입하기</PrimaryButton>
            <Text size="xs" color="secondary">
              가입을 완료하면 서비스 약관과 개인정보 처리방침에 동의하는 것으로
              간주됩니다.
            </Text>
          </Actions>

          <LoginSection>
            <Text size="sm" color="secondary">
              이미 회원이신가요?
            </Text>
            <Modal.OpenTrigger>
              <LoginButton type="button">로그인</LoginButton>
            </Modal.OpenTrigger>
          </LoginSection>
        </FormCard>
        <LoginModal />
      </Modal>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background:
    radial-gradient(circle at top, rgba(255, 157, 46, 0.18), transparent 55%),
    radial-gradient(
      circle at 15% 20%,
      rgba(75, 107, 251, 0.22),
      transparent 45%
    ),
    ${({ theme }) => theme.colors.background.canvas};
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      rgba(75, 107, 251, 0.18),
      rgba(31, 59, 212, 0)
    );
    filter: blur(0px);
    z-index: 0;
  }

  &::before {
    width: 320px;
    height: 320px;
    top: -140px;
    right: -120px;
  }

  &::after {
    width: 260px;
    height: 260px;
    bottom: -130px;
    left: -110px;
    background: linear-gradient(
      135deg,
      rgba(255, 157, 46, 0.25),
      rgba(231, 120, 0, 0)
    );
  }
`;

const FormCard = styled.form`
  width: min(420px, 100%);
  background: ${({ theme }) => theme.colors.background.surface};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: 32px 28px;
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
  z-index: 1;
  animation: slideUp 0.55s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
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

const LoginButton = styled.button`
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.typography.size.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  border: 2px solid ${({ theme }) => theme.colors.brand.primary};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.primaryMuted};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.brand.primaryMuted};
    border-color: ${({ theme }) => theme.colors.brand.primaryStrong};
  }
`;
