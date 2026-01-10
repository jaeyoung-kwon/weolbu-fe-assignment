import { useLocalStorageState } from '@/shared/hooks/useLocalStorageState';
import type { PropsWithChildren } from 'react';
import type { User } from '../api/auth.type';
import { AuthContext, type AuthContextValue } from './AuthContext';
import { ACCESS_TOKEN_KEY, TOKEN_TYPE_KEY } from '@/lib';

const USER_KEY = 'user';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorageState<User | null>(USER_KEY, null);
  const [token, setToken] = useLocalStorageState<string | null>(
    ACCESS_TOKEN_KEY,
    null,
  );
  const [tokenType, setTokenType] = useLocalStorageState<string | null>(
    TOKEN_TYPE_KEY,
    null,
  );

  const login = (newToken: string, newTokenType: string, newUser: User) => {
    setToken(newToken);
    setTokenType(newTokenType);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setTokenType(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    token,
    tokenType,
    isLoggedIn: token !== null && user !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
