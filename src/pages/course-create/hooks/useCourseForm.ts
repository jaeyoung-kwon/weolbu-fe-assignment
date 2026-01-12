import type { ChangeEvent, FocusEvent } from 'react';
import { useCallback, useState } from 'react';
import { formatNumber, formatPrice } from '../utils/parser';
import {
  validateCourseCapacity,
  validateCourseDescription,
  validateCoursePrice,
  validateCourseTitle,
} from '../utils/validator';

const INIT_FORM_VALUES = {
  title: '',
  description: '',
  capacity: '',
  price: '',
};

interface CourseFormData {
  title: string;
  description: string;
  capacity: string;
  price: string;
}

type CourseFormErrors = Partial<Record<keyof CourseFormData, string>>;

const validators: Record<keyof CourseFormData, (value: string) => string> = {
  title: validateCourseTitle,
  description: validateCourseDescription,
  capacity: validateCourseCapacity,
  price: validateCoursePrice,
};

export const useCourseForm = () => {
  const [form, setForm] = useState<CourseFormData>(INIT_FORM_VALUES);
  const [errors, setErrors] = useState<CourseFormErrors>({});

  const handleChange =
    (key: keyof CourseFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      if (key === 'price') {
        setForm((prev) => ({
          ...prev,
          price: formatPrice(event.target.value),
        }));
        return;
      }

      if (key === 'capacity') {
        setForm((prev) => ({
          ...prev,
          capacity: formatNumber(event.target.value),
        }));
        return;
      }

      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleBlur = useCallback(
    (key: keyof CourseFormData) => (event: FocusEvent<HTMLInputElement>) => {
      const validator = validators[key];
      const value = event.target.value;
      const error = validator(value);

      setErrors((prev) => ({ ...prev, [key]: error }));
    },
    [],
  );

  const validateForm = useCallback(() => {
    const nextErrors = (Object.keys(validators) as (keyof CourseFormData)[])
      .map((key) => ({ key, error: validators[key](form[key]) }))
      .reduce((acc, { key, error }) => {
        if (error) {
          acc[key] = error;
        }

        return acc;
      }, {} as CourseFormErrors);

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const resetForm = () => {
    setForm(INIT_FORM_VALUES);
    setErrors({});
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  };
};
