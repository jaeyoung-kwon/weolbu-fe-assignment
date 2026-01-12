import { fetcher } from '@/lib';
import type { User, UserRole } from './auth.type';

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
};

export const signup = async (props: SignupRequest): Promise<User> => {
  return fetcher.post<SignupRequest, User>({
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
  user: User;
};

export const login = async (props: LoginRequest): Promise<LoginResponse> => {
  return fetcher.post<LoginRequest, LoginResponse>({
    path: '/users/login',
    body: props,
  });
};
