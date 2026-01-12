import LoginModal from '@/pages/signup/components/LoginModal';
import SignupForm from '@/pages/signup/components/SignupForm';
import { useLoginMutation } from '@/pages/signup/hooks/useLoginMutation';
import { useSignupForm } from '@/pages/signup/hooks/useSignupForm';
import { useSignupMutation } from '@/pages/signup/hooks/useSignupMutation';
import { Button, Modal, PageLayout, Text } from '@/shared/components';
import styled from '@emotion/styled';
import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent } from 'react';

export const Route = createFileRoute('/_public/signup')({
  component: SignupPage,
});

function SignupPage() {
  const { form, errors, handleChange, handleBlur } = useSignupForm();

  const { mutate: login } = useLoginMutation();
  const { mutate: signup } = useSignupMutation();

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
          login({
            email: form.email,
            password: form.password,
          });
        },
      },
    );
  };

  return (
    <PageLayout>
      <Container>
        <Header>
          <AccentBar />
          <Text as="h1" size="xl" weight="semibold">
            회원 가입
          </Text>
        </Header>

        <SignupForm
          form={form}
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />

        <PrimaryButton
          type="submit"
          form="signup-form"
          disabled={Object.keys(errors).length > 0}
        >
          가입하기
        </PrimaryButton>

        <Modal>
          <LoginSection>
            <Text size="sm" color="secondary">
              이미 회원이신가요?
            </Text>
            <Modal.OpenTrigger asChild>
              <LoginButton variant="outlined">로그인</LoginButton>
            </Modal.OpenTrigger>
            <LoginModal />
          </LoginSection>
        </Modal>
      </Container>
    </PageLayout>
  );
}

const Container = styled.div`
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
