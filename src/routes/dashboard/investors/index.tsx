import { createFileRoute } from '@tanstack/react-router'
import { requireInvestor } from '#/lib/auth.middleware'

export const Route = createFileRoute('/dashboard/investors/')({
  beforeLoad: () => requireInvestor(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/investors/"!</div>
}
