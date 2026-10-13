import { createFileRoute } from '@tanstack/react-router'
import { Microscope } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '#/components/ui/empty'

export const Route = createFileRoute('/dashboard/maker/trials')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="flex-1 p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Clinical Trials</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Manage protocols, track phases, and schedule trial timelines.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shrink-0">
                    Add Trial
                </Button>
            </div>

            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Microscope className="w-8 h-8" />
                    </EmptyMedia>
                    <EmptyTitle>No clinical trials found</EmptyTitle>
                    <EmptyDescription>
                        You haven't registered any clinical trials yet. Start a new trial to manage protocols and track phases for your medicines.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        Create Trial
                    </Button>
                    <Button variant="outline" className='w-fit'>Learn More</Button>
                </EmptyContent>
            </Empty>
        </main>
    )
}
