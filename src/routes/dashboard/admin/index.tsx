import { createFileRoute } from '@tanstack/react-router'
import { requireAdmin } from '#/lib/auth.middleware'

export const Route = createFileRoute('/dashboard/admin/')({
  beforeLoad: () => requireAdmin(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/admin/"!</div>
}
