import { createFileRoute } from '@tanstack/react-router'
import { ChartNoAxesCombined } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '#/components/ui/empty'

export const Route = createFileRoute('/dashboard/maker/marketplace')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="flex-1 p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Deal Room & Marketplace</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Showcase your approved medicines and trial findings to verified investors.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shrink-0">
                    Publish Listing
                </Button>
            </div>

            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ChartNoAxesCombined className="w-8 h-8" />
                    </EmptyMedia>
                    <EmptyTitle>Deal room is empty</EmptyTitle>
                    <EmptyDescription>
                        You haven't showcased any medicines or trial findings to investors yet. Publish your verified formulations to attract funding.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        Publish Listing
                    </Button>
                    <Button variant="outline" className='w-fit'>Learn More</Button>
                </EmptyContent>
            </Empty>
        </main>
    )
}
