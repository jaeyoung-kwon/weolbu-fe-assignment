import { useAuth } from '@/shared/contexts/auth';
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

interface AuthGuardProps {
  requireAuth: boolean;
  redirectTo: string;
}

const AuthGuard = ({
  requireAuth,
  redirectTo,
  children,
}: PropsWithChildren<AuthGuardProps>) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !user) {
      navigate({ to: redirectTo });
    } else if (!requireAuth && user) {
      navigate({ to: redirectTo });
    }
  }, [user, requireAuth, redirectTo, navigate]);

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
