import { fetcher } from '../../lib/fetcher/fetcher';

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
