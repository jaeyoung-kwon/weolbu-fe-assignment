import { Input, Modal } from '@/shared/components';
import { useModalContext } from '@/shared/components/Modal/ModalContext';
import styled from '@emotion/styled';
import type { FormEvent } from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import { useLoginMutation } from '../hooks/useLoginMutation';

const LoginModal = () => {
  const { form, errors, handleChange, handleBlur, resetForm } = useLoginForm();

  const { onClose } = useModalContext();
  const { mutate: login } = useLoginMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(
      {
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      },
    );
  };

  return (
    <Modal.Container title="로그인" onClose={resetForm}>
      <LoginForm onSubmit={handleSubmit}>
        <FormFields>
          <Input
            label="이메일"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="이메일을 입력하세요"
            error={errors.email}
            required
          />
          <Input
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="비밀번호를 입력하세요"
            error={errors.password}
            required
          />
        </FormFields>

        <Modal.ButtonGroup>
          <Modal.PrimaryButton type="submit">로그인</Modal.PrimaryButton>
        </Modal.ButtonGroup>
      </LoginForm>
    </Modal.Container>
  );
};

export default LoginModal;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
