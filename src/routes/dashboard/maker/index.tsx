import { createFileRoute } from '@tanstack/react-router'
import { requireVerifiedMaker } from '#/lib/auth.middleware'

export const Route = createFileRoute('/dashboard/maker/')({
  beforeLoad: () => requireVerifiedMaker(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/maker/"!</div>
}
