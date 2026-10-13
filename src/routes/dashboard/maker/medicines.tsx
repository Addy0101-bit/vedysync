import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRightIcon, FlaskConical, Plus } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '#/components/ui/empty'

export const Route = createFileRoute('/dashboard/maker/medicines')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="flex-1 p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Formulations & Medicines</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Manage your catalog of AYUSH medicines and botanical formulations.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm shrink-0">
                    Add Medicine
                </Button>
            </div>

            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FlaskConical className="w-8 h-8" />
                    </EmptyMedia>
                    <EmptyTitle>No formulations found</EmptyTitle>
                    <EmptyDescription>
                        You haven't added any AYUSH medicines or botanical formulations to your catalog yet. Get started by adding a new formulation dossier.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        Add Medicine
                    </Button>
                    <Button variant="outline" className='w-fit'>Learn More</Button>
                </EmptyContent>
            </Empty>
        </main>
    )
}
