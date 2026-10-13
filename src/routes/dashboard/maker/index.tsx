import { createFileRoute } from '@tanstack/react-router'
import { requireVerifiedMaker } from '#/lib/auth.middleware'

export const Route = createFileRoute('/dashboard/maker/')({
  beforeLoad: () => requireVerifiedMaker(),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Overview / Dashboard</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Quick metric cards (active trials, total formulations, active testers under surveillance) and recent activity logs will go here.</p>
    </main>
  );
}
