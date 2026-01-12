import { AuthGuard } from '@/shared/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard requireAuth={true} redirectTo="/signup">
      <Outlet />
    </AuthGuard>
  );
}
