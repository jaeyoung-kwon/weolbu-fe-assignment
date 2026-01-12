export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type UserRole = 'STUDENT' | 'INSTRUCTOR';
