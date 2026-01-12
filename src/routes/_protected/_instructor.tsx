import { RoleGuard } from '@/shared/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/_instructor')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RoleGuard allowedRoles={['INSTRUCTOR']} redirectTo="/">
      <Outlet />
    </RoleGuard>
  );
}
