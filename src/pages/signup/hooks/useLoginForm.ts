import type { ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validator';

type LoginFormData = {
  email: string;
  password: string;
};

const INIT_FORM_VALUES = {
  email: '',
  password: '',
};

const validators: Record<keyof LoginFormData, (value: string) => string> = {
  email: validateEmail,
  password: validatePassword,
};

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginFormData>(INIT_FORM_VALUES);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleChange =
    (key: keyof LoginFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleBlur =
    (key: keyof LoginFormData) => (event: FocusEvent<HTMLInputElement>) => {
      const validator = validators[key];
      const value = event.target.value;
      const error = validator(value);

      setErrors((prev) => ({ ...prev, [key]: error }));
    };

  const resetForm = () => {
    setForm(INIT_FORM_VALUES);
    setErrors({});
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    resetForm,
  };
};
