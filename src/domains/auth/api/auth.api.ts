import { fetcher } from '@/lib';

export type UserRole = 'STUDENT' | 'INSTRUCTOR';

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type SignupResponse = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
};

export const signup = async (props: SignupRequest): Promise<SignupResponse> => {
  return fetcher.post<SignupRequest, SignupResponse>({
    path: '/users/signup',
    body: props,
  });
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: UserRole;
  };
};

export const login = async (props: LoginRequest): Promise<LoginResponse> => {
  return fetcher.post<LoginRequest, LoginResponse>({
    path: '/users/login',
    body: props,
  });
};
