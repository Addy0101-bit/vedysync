import { createFileRoute } from '@tanstack/react-router'
import { AdminLoading } from '#/components/admin/loading'

export const Route = createFileRoute('/dashboard/admin/report')({
    loader: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500))
    },
    pendingComponent: AdminLoading,
    pendingMs: 0,
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Reports</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">View and manage system reports.</p>
        </main>
    );
}
