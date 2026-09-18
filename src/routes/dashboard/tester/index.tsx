import { createFileRoute } from '@tanstack/react-router'
import { requireTester } from '#/lib/auth.middleware'

export const Route = createFileRoute('/dashboard/tester/')({
  beforeLoad: () => requireTester(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/tester/"!</div>
}
