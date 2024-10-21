import { AuthLayout } from '@/features/auth/components/auth-layout'
import { isAuthenticated } from '@/features/auth/services'
import { redirect } from '@tanstack/react-router'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_guest')({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/admin',
      })
    }
  },
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
