import { createFileRoute } from '@tanstack/react-router'
import { requireMaker } from '#/lib/auth.middleware'

export const Route = createFileRoute('/dashboard/maker/')({
  beforeLoad: () => requireMaker(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/maker/"!</div>
}
