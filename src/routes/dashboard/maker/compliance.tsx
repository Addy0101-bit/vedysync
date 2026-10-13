import { createFileRoute } from '@tanstack/react-router'
import { FileCheck } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '#/components/ui/empty'

export const Route = createFileRoute('/dashboard/maker/compliance')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="flex-1 p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Compliance & Documents</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Track regulatory paperwork, IEC approvals, and your degree/license files.</p>
                </div>
            </div>

            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FileCheck className="w-8 h-8" />
                    </EmptyMedia>
                    <EmptyTitle>No documents found</EmptyTitle>
                    <EmptyDescription>
                        You haven't uploaded any regulatory paperwork yet. Start uploading your Institutional Ethics Committee (IEC) approvals and licenses to stay compliant.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" className='w-fit'>Learn More</Button>
                </EmptyContent>
            </Empty>
        </main>
    )
}
