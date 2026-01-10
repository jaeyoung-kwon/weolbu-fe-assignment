import { Input, Modal } from '@/shared/components';
import styled from '@emotion/styled';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLoginMutation } from '../hooks/useLoginMutation';

const LoginModal = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { mutate: login } = useLoginMutation();

  const handleChange =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <Modal.Container title="로그인">
      <LoginForm onSubmit={handleSubmit}>
        <FormFields>
          <Input
            label="이메일"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="이메일을 입력하세요"
            required
          />
          <Input
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="비밀번호를 입력하세요"
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
