import type { ChangeEvent } from 'react';
import { useState } from 'react';

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

export const useCourseForm = () => {
  const [form, setForm] = useState<CourseFormData>(INIT_FORM_VALUES);

  const handleChange =
    (key: keyof CourseFormData) => (event: ChangeEvent<HTMLInputElement>) => {
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
