import { createFileRoute } from '@tanstack/react-router'
import { Activity } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '#/components/ui/empty'

export const Route = createFileRoute('/dashboard/maker/surveillance')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="flex-1 p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Participant Surveillance</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Monitor real-time data logs, adverse events, and health metrics.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shrink-0">
                    Add Participant
                </Button>
            </div>

            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Activity className="w-8 h-8" />
                    </EmptyMedia>
                    <EmptyTitle>No surveillance data found</EmptyTitle>
                    <EmptyDescription>
                        You don't have any active participants under surveillance yet. Add testers to your trials to start monitoring their health metrics.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        Add Participant
                    </Button>
                    <Button variant="outline" className='w-fit'>Learn More</Button>
                </EmptyContent>
            </Empty>
        </main>
    )
}
