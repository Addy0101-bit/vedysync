import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireAdmin } from '#/lib/auth.middleware'
import AdminSidebar from '#/components/admin/sidebar'
import AdminHeader from '#/components/admin/header'
import { AdminLoading } from '#/components/admin/loading'

export const Route = createFileRoute('/dashboard/admin')({
    beforeLoad: () => requireAdmin(),
    pendingComponent: () => (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/50">
            <AdminSidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <AdminHeader />
                <AdminLoading />
            </div>
        </div>
    ),
    component: AdminLayoutComponent,
})

function AdminLayoutComponent() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/50">
            <AdminSidebar />
            <div className="pl-64 flex flex-col min-h-screen w-full">
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    )
}
