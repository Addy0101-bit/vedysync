import { createFileRoute, Outlet } from '@tanstack/react-router'

function DashboardPending() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 z-50">
      <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 border-border border rounded p-2">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100"></div>
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
