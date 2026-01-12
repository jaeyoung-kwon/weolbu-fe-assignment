import { AuthGuard } from '@/shared/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <Outlet />
    </AuthGuard>
  );
}
