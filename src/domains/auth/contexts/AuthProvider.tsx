import { useLocalStorageState } from '@/shared/hooks/useLocalStorageState';
import type { PropsWithChildren } from 'react';
import type { User } from '../api/auth.type';
import { AuthContext, type AuthContextValue } from './AuthContext';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorageState<User | null>('user', null);
  const [token, setToken] = useLocalStorageState<string | null>(
    'accessToken',
    null,
  );

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: token !== null && user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
