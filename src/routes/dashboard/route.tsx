import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ThinkingOrb } from 'thinking-orbs';

function DashboardPending() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 z-50">
      <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 border-border border rounded-full px-4 py-2">
        <ThinkingOrb theme='auto' state="searching" size={32} />
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">Loading...</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    // Artificial delay to ensure the loading screen animation always plays
    await new Promise((resolve) => setTimeout(resolve, 600))
  },
  pendingComponent: DashboardPending,
  pendingMs: 0,
  component: () => <Outlet />,
})
