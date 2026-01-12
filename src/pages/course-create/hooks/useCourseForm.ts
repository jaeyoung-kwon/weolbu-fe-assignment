import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface CourseFormData {
  title: string;
  description: string;
  capacity: string;
  price: string;
}

export const useCourseForm = () => {
  const [form, setForm] = useState<CourseFormData>({
    title: '',
    description: '',
    capacity: '',
    price: '',
  });

  const handleChange =
    (key: keyof CourseFormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      capacity: '',
      price: '',
    });
  };

  return {
    form,
    handleChange,
    resetForm,
  };
};
