import { createContext, useContext } from 'react';
import type { User } from '../api/auth.type';

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  tokenType: string | null;
  isLoggedIn: boolean;
  login: (token: string, tokenType: string, user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
