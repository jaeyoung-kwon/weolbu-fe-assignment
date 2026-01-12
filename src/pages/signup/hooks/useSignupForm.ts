import type { ChangeEvent, FocusEvent } from 'react';
import { useCallback, useState } from 'react';
import { parsePhoneNumber } from '../utils/parser';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../utils/validator';

type Role = 'student' | 'instructor';

type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
};

const INIT_FORM_VALUES = {
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'instructor' as Role,
} as const;

const validators: Partial<
  Record<keyof SignupFormData, (value: string) => string>
> = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
};

type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;

export const useSignupForm = () => {
  const [form, setForm] = useState<SignupFormData>(INIT_FORM_VALUES);
  const [errors, setErrors] = useState<SignupFormErrors>({});

  const handleChange = useCallback(
    (key: keyof SignupFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue =
        key === 'phone'
          ? parsePhoneNumber(event.target.value)
          : event.target.value;

      setForm((prev) => ({ ...prev, [key]: nextValue }));
    },
    [],
  );

  const handleBlur = useCallback(
    (key: keyof SignupFormData) => (event: FocusEvent<HTMLInputElement>) => {
      const validator = validators[key];
      if (!validator) {
        return;
      }

      const value = event.target.value;
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [key]: error }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setForm(INIT_FORM_VALUES);
    setErrors({});
  }, []);

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    resetForm,
  };
};
