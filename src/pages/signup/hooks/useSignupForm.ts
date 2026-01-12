import type { ChangeEvent } from 'react';
import { useState } from 'react';

type Role = 'student' | 'instructor';

const INIT_FORM_VALUES = {
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'instructor' as Role,
} as const;

interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
}

export const useSignupForm = () => {
  const [form, setForm] = useState<SignupFormData>(INIT_FORM_VALUES);

  const handleChange =
    (key: keyof SignupFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const resetForm = () => {
    setForm(INIT_FORM_VALUES);
  };

  return {
    form,
    handleChange,
    resetForm,
  };
};
