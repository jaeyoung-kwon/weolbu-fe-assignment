import type { UserRole } from '@/shared/apis/auth/auth.type';
import { useAuth } from '@/shared/contexts/auth';
import { useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  redirectTo: string;
}

const RoleGuard = ({
  allowedRoles,
  redirectTo,
  children,
}: PropsWithChildren<RoleGuardProps>) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      navigate({ to: redirectTo });
    }
  }, [user, allowedRoles, redirectTo, navigate]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
