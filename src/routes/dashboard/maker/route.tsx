import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireVerifiedMaker } from '#/lib/auth.middleware'
import MakerSidebar from '#/components/maker/sidebar'
import MakerHeader from '#/components/maker/header'
import { MakerLoading } from '#/components/maker/loading'

export const Route = createFileRoute('/dashboard/maker')({
    beforeLoad: () => requireVerifiedMaker(),
    pendingComponent: () => (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/50">
            <MakerSidebar />
            <div className="pl-64 flex flex-col min-h-screen w-full">
                <MakerHeader />
                <MakerLoading />
            </div>
        </div>
    ),
    component: MakerLayoutComponent,
})

function MakerLayoutComponent() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/50">
            <MakerSidebar />
            <div className="pl-64 flex flex-col min-h-screen w-full">
                <MakerHeader />
                <Outlet />
            </div>
        </div>
    )
}
